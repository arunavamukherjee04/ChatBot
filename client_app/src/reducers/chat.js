import {
    NEW_CHAT_REQUEST,
    SEND_CHAT_REQUEST,
    MESSAGE_RECIEVED_ACTION,
    SEND_MESSAGE_ACTION,
    LOAD_OLD_MESSAGES
} from '../actions/types';
const initialState = {
    chat_with: null,
    messages: [],
    is_requested: false,
    is_approved: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case NEW_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload,
                is_requested: true,
                is_approved: false,
            }

        case SEND_CHAT_REQUEST:
            return {
                ...state,
                chat_with: payload,
                is_requested: true,
                is_approved: false,
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
                messages: payload.messages
            }

        default:
            return state;
    }

}