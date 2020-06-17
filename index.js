const express = require('express');

/**
 * Importing custom router
 */
const router = require('./router');
const Socket = require('./SocketIO');

const application = express();


const PORT = process.env.PORT || 8080;

//Init middleware
application.use(express.json({
    extended: false
}));
application.use(router);

Socket.createSocketIO(application);
const {io, server} = Socket.getSocketIO();

/**
 * Runs when a client connect
 */
const users = [];
io.on('connection', (socket) => {
    console.log(`USER CONNECTED!`);

    socket.on('disconnect', () => {
        io.emit('message', 'A user has let the chat');
        console.log("a user has left the chat");
    });
});

server.listen(PORT, () => console.log(`${new Date().toISOString()}: server started on port ${PORT}`));


