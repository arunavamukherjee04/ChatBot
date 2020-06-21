import {
    REDUX_EVENT_SEND_CHAT_REQUEST,
    REDUX_EVENT_SEND_MESSAGE,
    REDUX_EVENT_LOAD_OLD_MESSAGES,
    REDUX_EVENT_APPROVED_CHAT_REQUEST
} from './types';


import {
    SOCKET_EVENT_NEW_CHAT_REQUEST,
    SOCKET_EVENT_SEND_MESSAGE_TO,
    SOCKET_EVENT_CHAT_REQUEST_APPROVED
} from '../Util/SocketEvents';

import EventEmitter from '../EventEmitter';

import PrivateChat from '../Util/PrivateChat';
import ChatStatus from '../Util/ChatStatus';
import {
    REQUESTED,
    APPROVED,
    NONE
} from '../Util/ChatStatusENUM';

const emitter = new EventEmitter();

export const send_chat_request = (from_user, to_user) => dispatch => {
    const event_payload = {
        from_user,
        to_user
    }
    emitter.emit(SOCKET_EVENT_NEW_CHAT_REQUEST, event_payload);

    ChatStatus.upsert({
        chat_with: to_user,
        status: REQUESTED
    });

    dispatch({
        type: REDUX_EVENT_SEND_CHAT_REQUEST,
        payload: { to_user, status: REQUESTED }
    });


}

export const send_message = (from_user, to_user, message) => dispatch => {
    const redux_payload = {
        from_user,
        to_user,
        message
    };

    const event_payload = {
        from_user,
        to_user,
        message: message.msg
    };

    emitter.emit(SOCKET_EVENT_SEND_MESSAGE_TO, event_payload);

    dispatch({
        type: REDUX_EVENT_SEND_MESSAGE,
        payload: redux_payload
    });
}

export const load_old_messages = (user) => dispatch => {
    const chats = PrivateChat.getByFriendId(user.user_id);
    let chat_status = ChatStatus.getByFriendId(user.user_id);
    if (!chat_status) {
        const chatStatusObj = {
            chat_with: user,
            status: NONE
        };

        ChatStatus.upsert(chatStatusObj);

        chat_status = chatStatusObj;
    }

    const old_messages = chats.map(chat => chat.message);
    dispatch({
        type: REDUX_EVENT_LOAD_OLD_MESSAGES,
        payload: {
            chat_with: user,
            messages: old_messages,
            chat_status: chat_status.status
        }
    });
}

export const chatRequestResponse = (isAccepted, from_user, to_user) => dispatch => {
    let SOCKET_EVENT;
    let CHAT_STATUS;
    let REDUX_EVENT_TYPE;

    if (isAccepted) {
        SOCKET_EVENT = SOCKET_EVENT_CHAT_REQUEST_APPROVED;
        CHAT_STATUS = APPROVED;
        REDUX_EVENT_TYPE = REDUX_EVENT_APPROVED_CHAT_REQUEST;
    }
    emitter.emit(SOCKET_EVENT, {
        from_user,
        to_user
    });

    ChatStatus.upsert({
        chat_with: to_user,
        status: CHAT_STATUS
    });


    dispatch({
        type: REDUX_EVENT_TYPE,
        payload: {
            chat_with: to_user,
            chat_status: CHAT_STATUS
        }
    })

}