import {
    NONE
} from '../Util/ChatStatusENUM';

import {
    REDUX_EVENT_NEW_CHAT_REQUEST,
    REDUX_EVENT_SEND_CHAT_REQUEST,
    REDUX_EVENT_MESSAGE_RECIEVED,
    REDUX_EVENT_SEND_MESSAGE,
    REDUX_EVENT_LOAD_OLD_MESSAGES,
    REDUX_EVENT_APPROVED_CHAT_REQUEST,
    REDUX_EVENT_CHAT_REQUEST_APPROVAL_RECIEVED
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
        case REDUX_EVENT_NEW_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.from_user,
                chat_status: payload.status,
                messages: []
            }

        case REDUX_EVENT_SEND_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.to_user,
                chat_status: payload.status

            }

        case REDUX_EVENT_MESSAGE_RECIEVED:
            return {
                ...state,
                is_requested: true,
                is_approved: true,
                messages: [...state.messages, payload]
            }

        case REDUX_EVENT_SEND_MESSAGE:
            return {
                ...state,
                is_requested: true,
                is_approved: true,
                messages: [...state.messages, payload.message]
            }

        case REDUX_EVENT_LOAD_OLD_MESSAGES:
            return {
                ...state,
                chat_with: payload.chat_with,
                messages: payload.messages, 
                chat_status: payload.chat_status
            }

        case REDUX_EVENT_APPROVED_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload.chat_with,
                chat_status: payload.chat_status
            }

        case REDUX_EVENT_CHAT_REQUEST_APPROVAL_RECIEVED:
            return {
                ...state,
                chat_with: payload.chat_with,
                chat_status: payload.chat_status
            }

        default:
            return state;
    }

}