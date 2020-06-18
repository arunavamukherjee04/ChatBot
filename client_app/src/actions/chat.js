import { SEND_CHAT_REQUEST, SEND_MESSAGE_ACTION, LOAD_OLD_MESSAGES } from './types';
import { CHAT_REQUEST, SEND_MESSAGE_TO } from '../Util/SocketEvents';
import EventEmitter from '../EventEmitter';

import PrivateChat from '../Util/PrivateChat';
import ChatStatus from '../Util/ChatStatus';
import ChatStatusENUM from '../Util/ChatStatusENUM';

const emitter = new EventEmitter();

export const send_chat_request = (from_user, to_user) => dispatch => {
    const event_payload = {
        from_user,
        to_user
    }
    emitter.emit(CHAT_REQUEST, event_payload);



    dispatch({
        type: SEND_CHAT_REQUEST,
        payload: to_user
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
    const chat_status = ChatStatus.getByFriendId(user.user_id);

    console.log(chat_status);
    const old_messages = chats.map(chat => chat.message);

    dispatch({
        type: LOAD_OLD_MESSAGES,
        payload: {
            chat_with: user,
            messages: old_messages
        }
    });
}