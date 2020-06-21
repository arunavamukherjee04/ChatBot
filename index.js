const express = require('express');

const Socket = require('./SocketIO');
const path = require('path');

const {
    SOCKET_EVENT_NEW_CHAT_REQUEST,
    SOCKET_EVENT_CHAT_REQUEST_APPROVED,
    SOCKET_EVENT_ADD_NEW_USER,
    SOCKET_EVENT_NEW_USER_ADDED,
    SOCKET_EVENT_I_AM_ADDED,
    SOCKET_EVENT_I_HAVE_CHAT_REQUEST,
    SOCKET_EVENT_MY_CHAT_REQUEST_APPROVED,
    SOCKET_EVENT_SEND_MESSAGE_TO,
    SOCKET_EVENT_MESSAGE_RECEIVED_FROM,
    SOCKET_EVENT_EXISTING_USER_DISCONNECTED
} = require('./SocketEvents');

const User = require('./Users');
const SocketStore = require('./Socket');
const { v4: uuidv4 } = require('uuid');

const application = express();


const PORT = process.env.PORT || 8080;

//Init middleware
application.use(express.json({
    extended: false
}));

Socket.createSocketIO(application);
const { io, server } = Socket.getSocketIO();

/**
 * Runs when a client connect
 */
const users = [];
io.on('connection', (socket) => {
    console.log(`USER CONNECTED!`);

    /**
    * Adding a new user
    */

    socket.on(SOCKET_EVENT_ADD_NEW_USER, (data) => {
        const new_user = {
            ...data,
            user_id: uuidv4(),
            is_online: true
        };

        const new_socket = {
            user_id: new_user.user_id,
            socket
        };

        User.add(new_user);
        SocketStore.add(new_socket);

        io.emit(SOCKET_EVENT_NEW_USER_ADDED, { users: User.getAll(), new_user });

        socket.emit(SOCKET_EVENT_I_AM_ADDED, new_user);
    })


    socket.on(SOCKET_EVENT_NEW_CHAT_REQUEST, (data) => {

        const { from_user, to_user } = data;

        SocketStore.getById(to_user.user_id).socket.emit(SOCKET_EVENT_I_HAVE_CHAT_REQUEST, from_user);
    });

    socket.on(SOCKET_EVENT_SEND_MESSAGE_TO, (data) => {
        const { from_user, to_user, message } = data;

        const message_payload = {
            from_user,
            message
        }
        SocketStore.getById(to_user.user_id).socket.emit(SOCKET_EVENT_MESSAGE_RECEIVED_FROM, message_payload);
    });

    socket.on(SOCKET_EVENT_CHAT_REQUEST_APPROVED, (data) => {
        const { from_user, to_user } = data;

        SocketStore.getById(to_user.user_id).socket.emit(SOCKET_EVENT_MY_CHAT_REQUEST_APPROVED, from_user);
    });



    socket.on('disconnect', () => {
        const disconnectedUserId = SocketStore.delete(socket.id)
        User.delete(disconnectedUserId)

        io.emit(SOCKET_EVENT_EXISTING_USER_DISCONNECTED, {deleted_user_id: disconnectedUserId, users: User.getAll()});
    });

});

// Serve static asset in production

if(process.env.NODE_ENV === 'production') {
    //set static folder
    application.use(express.static('client_app/build'));

    application.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client_app', 'build', 'index.html'));
    });
}


server.listen(PORT, () => console.log(`${new Date().toISOString()}: server started on port ${PORT}`));


