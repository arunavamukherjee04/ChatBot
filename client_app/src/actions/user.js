//import axios from 'axios';
import { SOCKET_EVENT_ADD_NEW_USER } from '../Util/SocketEvents';
import EventEmitter from '../EventEmitter';

const emitter = new EventEmitter();

/**
 * Join the user
 */


export const join_user = (name) => async dispatch => {

    try {
        emitter.emit(SOCKET_EVENT_ADD_NEW_USER, { name });
    } catch (error) {

    }
} 