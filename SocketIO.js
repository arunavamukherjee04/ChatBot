const http = require('http');
const socket = require('socket.io');

function SocketIO() {
    console.log('Socket.io is executing');
    let instance;

    function createSocketIO(application) {
        if (!instance && application) {
            const server = http.Server(application);
            const io = socket(server);
            instance = { io, server };
        }
    }

    function getSocketIO() {
        return instance;
    }

    return { createSocketIO, getSocketIO };
};

module.exports = SocketIO();