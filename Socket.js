const sockets = [];

const Socket = {
    add: socket => sockets.push(socket),
    getById: id => sockets.filter(socket => socket.user_id === id)[0],
}

module.exports = Socket;