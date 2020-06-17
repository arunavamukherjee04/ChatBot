import Socket from './Util/Socket';

import store from './store';
import { NEW_USER_JOINED } from './actions/types';



function EventManager() {
    const socket = Socket.getSocket();
    socket.on('USER_JOINED', users => {
        store.dispatch({
            type: NEW_USER_JOINED,
            payload: users
        });
    });
}

export default EventManager;
