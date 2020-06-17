import io from 'socket.io-client';
function Socket() {
    let socket;
    const ENDPOINT = 'http://localhost:8080';

    function getSocket() {
        if (!socket) {
            socket = io(ENDPOINT);
        }

        return socket;
    }

    return { getSocket };
}


export default Socket();