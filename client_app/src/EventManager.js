import Socket from './Util/Socket';
import { v4 as uuidv4 } from 'uuid';
import store from './store';
import {
    REDUX_EVENT_USER_LIST_UPDATED,
    REDUX_EVENT_USER_JOIN_REQ_ACCEPTED,
    REDUX_EVENT_NEW_CHAT_REQUEST,
    REDUX_EVENT_MESSAGE_RECIEVED,
    REDUX_EVENT_CHAT_REQUEST_APPROVAL_RECIEVED
} from './actions/types';

import {
    SOCKET_EVENT_NEW_USER_ADDED,
    SOCKET_EVENT_EXISTING_USER_DISCONNECTED,
    SOCKET_EVENT_I_AM_ADDED,
    SOCKET_EVENT_I_HAVE_CHAT_REQUEST,
    SOCKET_EVENT_MESSAGE_RECEIVED_FROM,
    SOCKET_EVENT_MY_CHAT_REQUEST_APPROVED
} from './Util/SocketEvents';


import PrivateChat from './Util/PrivateChat';
import ChatStatus from './Util/ChatStatus';
import { APPROVED, REQUEST_RECEIVED, NONE } from './Util/ChatStatusENUM';



function EventManager() {
    const socket = Socket.getSocket();
    socket.on(SOCKET_EVENT_NEW_USER_ADDED, data => {
        store.dispatch({
            type: REDUX_EVENT_USER_LIST_UPDATED,
            payload: data.users
        });

        ChatStatus.add({ chat_with: data.new_user, status: NONE });
    });

    socket.on(SOCKET_EVENT_EXISTING_USER_DISCONNECTED, data => {
        store.dispatch({
            type: REDUX_EVENT_USER_LIST_UPDATED,
            payload: data.users
        });

        ChatStatus.delete(data.deleted_user_id);
    });

    socket.on(SOCKET_EVENT_I_AM_ADDED, user => {
        store.dispatch({
            type: REDUX_EVENT_USER_JOIN_REQ_ACCEPTED,
            payload: user
        });
    });

    socket.on(SOCKET_EVENT_I_HAVE_CHAT_REQUEST, (from_user) => {

        ChatStatus.upsert({
            chat_with: from_user,
            status: REQUEST_RECEIVED
        });

        store.dispatch({
            type: REDUX_EVENT_NEW_CHAT_REQUEST,
            payload: { from_user, status: REQUEST_RECEIVED }
        })
    });

    socket.on(SOCKET_EVENT_MESSAGE_RECEIVED_FROM, (message_payload) => {
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

        const chat_with = store.getState().chat.chat_with;
        if (chat_with.user_id === message_payload.from_user.user_id) {
            store.dispatch({
                type: REDUX_EVENT_MESSAGE_RECIEVED,
                payload: message
            });
        }
    });

    socket.on(SOCKET_EVENT_MY_CHAT_REQUEST_APPROVED, (from_user) => {

        ChatStatus.upsert({
            chat_with: from_user,
            status: APPROVED
        });

        store.dispatch({
            type: REDUX_EVENT_CHAT_REQUEST_APPROVAL_RECIEVED,
            payload: {
                chat_with: from_user,
                chat_status: APPROVED
            }
        });
    })
}

export default EventManager;
