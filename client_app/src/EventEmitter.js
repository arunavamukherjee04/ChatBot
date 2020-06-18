import Socket from './Util/Socket';

function EventEmitter() {
    const socket = Socket.getSocket();

    function emit(type, payload = null) {
        socket.emit(type, payload);
    }

    return { emit };
}

export default EventEmitter;
