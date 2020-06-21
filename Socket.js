const sockets = [];

const Socket = {
    add: socket => sockets.push(socket),
    getById: id => sockets.find(socket => socket.user_id === id),
    delete: (id) => {
        /**
         * Get the cocket by socket id
         */

        const selectedSocket = sockets.find(_socket => _socket.socket.id === id);
        if (selectedSocket) {
            const selectedUserId = selectedSocket.user_id;
            const deleteIndex = sockets.indexOf(selectedSocket);
            sockets.splice(deleteIndex, 1);

            return selectedUserId
        }


    }
}

module.exports = Socket;