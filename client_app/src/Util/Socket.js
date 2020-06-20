import io from 'socket.io-client';
function Socket() {
    let socket;
    const ENDPOINT = '';

    function getSocket() {
        if (!socket) {
            socket = io(ENDPOINT);
        }

        return socket;
    }

    return { getSocket };
}


export default Socket();