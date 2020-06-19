import Socket from './Util/Socket';
import { v4 as uuidv4 } from 'uuid';
import store from './store';
import {
    NEW_USER_JOINED,
    USER_JOIN_REQ_ACCEPTED,
    NEW_CHAT_REQUEST,
    MESSAGE_RECIEVED_ACTION,
    CHAT_REQUEST_APPROVAL_RECIEVED
} from './actions/types';

import {
    ADD_REQ_ACCEPTED,
    NEW_USER_ADDED,
    CHAT_REQ_TO_CLIENT,
    MESSAGE_RECEIVED,
    CHAT_REQUEST_APPROVED
} from './Util/SocketEvents';


import PrivateChat from './Util/PrivateChat';
import ChatStatus from './Util/ChatStatus';
import { APPROVED, REQUESTED, REQUEST_RECEIVED, NONE } from './Util/ChatStatusENUM';



function EventManager() {
    const socket = Socket.getSocket();
    socket.on(NEW_USER_ADDED, data => {
        store.dispatch({
            type: NEW_USER_JOINED,
            payload: data.users
        });

        ChatStatus.add({ chat_with: data.new_user, status: NONE });
    });

    socket.on(ADD_REQ_ACCEPTED, user => {
        store.dispatch({
            type: USER_JOIN_REQ_ACCEPTED,
            payload: user
        });
    });

    socket.on(CHAT_REQ_TO_CLIENT, (from_user) => {

        ChatStatus.upsert({
            chat_with: from_user,
            status: REQUEST_RECEIVED
        });

        store.dispatch({
            type: NEW_CHAT_REQUEST,
            payload: { from_user, status: REQUEST_RECEIVED }
        })
    });

    socket.on(MESSAGE_RECEIVED, (message_payload) => {
        const message = {
            message_id: uuidv4(),
            is_msg_received: true,
            is_msg_sent: false,
            msg: message_payload.message
        }

        const private_message = {
            chat_with: message_payload.from_user,
            message
        }
        PrivateChat.add(private_message);

        store.dispatch({
            type: MESSAGE_RECIEVED_ACTION,
            payload: message
        });
    })

    socket.on(CHAT_REQUEST_APPROVED, (from_user) => {

        ChatStatus.upsert({
            chat_with: from_user,
            status: APPROVED
        });

        store.dispatch({
            type: CHAT_REQUEST_APPROVAL_RECIEVED,
            payload: {
                chat_with: from_user,
                chat_status: APPROVED
            }
        });
    })



}

export default EventManager;
