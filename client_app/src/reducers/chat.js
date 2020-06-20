import {
    REQUESTED,
    APPROVED,
    NONE,
    REQUEST_RECEIVED
} from '../Util/ChatStatusENUM';

import {
    NEW_CHAT_REQUEST,
    SEND_CHAT_REQUEST,
    MESSAGE_RECIEVED_ACTION,
    SEND_MESSAGE_ACTION,
    LOAD_OLD_MESSAGES,
    APPROVED_CHAT_REQUEST,
    CHAT_REQUEST_APPROVAL_RECIEVED
} from '../actions/types';
const initialState = {
    chat_with: null,
    messages: [],
    is_requested: false,
    is_approved: false,
    chat_status: NONE
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case NEW_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.from_user,
                chat_status: payload.status,
                messages: []
            }

        case SEND_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.to_user,
                chat_status: payload.status

            }

        case MESSAGE_RECIEVED_ACTION:
            return {
                ...state,
                is_requested: true,
                is_approved: true,
                messages: [...state.messages, payload]
            }

        case SEND_MESSAGE_ACTION:
            return {
                ...state,
                is_requested: true,
                is_approved: true,
                messages: [...state.messages, payload.message]
            }

        case LOAD_OLD_MESSAGES:
            return {
                ...state,
                chat_with: payload.chat_with,
                messages: payload.messages, 
                chat_status: payload.chat_status
            }

        case APPROVED_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.chat_with,
                chat_status: payload.chat_status
            }

        case CHAT_REQUEST_APPROVAL_RECIEVED:
            return {
                ...state,
                chat_with: payload.chat_with,
                chat_status: payload.chat_status
            }

        default:
            return state;
    }

}