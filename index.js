const express = require('express');

/**
 * Importing custom router
 */
const router = require('./router');
const Socket = require('./SocketIO');
const {
    CHAT_REQUEST,
    ADD_NEW_USER,
    ADD_REQ_ACCEPTED,
    NEW_USER_ADDED,
    CHAT_REQ_TO_CLIENT,
    SEND_MESSAGE_TO,
    MESSAGE_RECEIVED,
    CHAT_REQ_ACCEPTED,
    CHAT_REQ_REJECTED,
    CHAT_REQUEST_APPROVED,
    CHAT_REQUEST_DENIED
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
application.use(router);

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

    socket.on(ADD_NEW_USER, (data) => {
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

        io.emit(NEW_USER_ADDED, { users: User.getAll(), new_user });

        socket.emit(ADD_REQ_ACCEPTED, new_user);
    })


    socket.on(CHAT_REQUEST, (data) => {

        const { from_user, to_user } = data;

        SocketStore.getById(to_user.user_id).socket.emit(CHAT_REQ_TO_CLIENT, from_user);
    });

    socket.on(SEND_MESSAGE_TO, (data) => {
        const { from_user, to_user, message } = data;

        const message_payload = {
            from_user,
            message
        }
        SocketStore.getById(to_user.user_id).socket.emit(MESSAGE_RECEIVED, message_payload);
    });

    socket.on(CHAT_REQ_ACCEPTED, (data) => {
        const { from_user, to_user } = data;

        SocketStore.getById(to_user.user_id).socket.emit(CHAT_REQUEST_APPROVED, from_user);
    });



    socket.on('disconnect', () => {
        io.emit('message', 'A user has let the chat');
        console.log("a user has left the chat");
    });




});

server.listen(PORT, () => console.log(`${new Date().toISOString()}: server started on port ${PORT}`));


