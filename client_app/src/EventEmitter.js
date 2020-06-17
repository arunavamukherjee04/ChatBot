import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';
const socket = io(ENDPOINT);

function EventEmitter() {
    console.log('emitting event');
    function _emit(type) {
        socket.emit(type);
    }

    return { _emit };
}

export default EventEmitter;
