import {
    SEND_CHAT_REQUEST,
    SEND_MESSAGE_ACTION,
    LOAD_OLD_MESSAGES,
    APPROVED_CHAT_REQUEST,
    REJECTED_CHAT_REQUEST
} from './types';

import {
    CHAT_REQUEST,
    SEND_MESSAGE_TO,
    CHAT_REQ_ACCEPTED,
    CHAT_REQ_REJECTED
} from '../Util/SocketEvents';

import EventEmitter from '../EventEmitter';

import PrivateChat from '../Util/PrivateChat';
import ChatStatus from '../Util/ChatStatus';
import {
    REQUESTED,
    APPROVED,
    REJECTED,
    NONE,
    REQUEST_RECEIVED,
} from '../Util/ChatStatusENUM';

const emitter = new EventEmitter();

export const send_chat_request = (from_user, to_user) => dispatch => {
    const event_payload = {
        from_user,
        to_user
    }
    emitter.emit(CHAT_REQUEST, event_payload);

    ChatStatus.upsert({
        chat_with: to_user,
        status: REQUESTED
    });

    dispatch({
        type: SEND_CHAT_REQUEST,
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

    emitter.emit(SEND_MESSAGE_TO, event_payload);

    dispatch({
        type: SEND_MESSAGE_ACTION,
        payload: redux_payload
    });
}

export const load_old_messages = (user) => dispatch => {
    const chats = PrivateChat.getByFriendId(user.user_id);
    let chat_status = ChatStatus.getByFriendId(user.user_id);
    console.log(chat_status);
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
        type: LOAD_OLD_MESSAGES,
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
        SOCKET_EVENT = CHAT_REQ_ACCEPTED;
        CHAT_STATUS = APPROVED;
        REDUX_EVENT_TYPE = APPROVED_CHAT_REQUEST;
    } else {
        SOCKET_EVENT = CHAT_REQ_REJECTED;
        CHAT_STATUS = REJECTED;
        REDUX_EVENT_TYPE = REJECTED_CHAT_REQUEST;
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