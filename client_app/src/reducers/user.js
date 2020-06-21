import { REDUX_EVENT_USER_JOIN_REQ_ACCEPTED, REDUX_EVENT_USER_LIST_UPDATED } from '../actions/types';

const initialState = {
    users: [],
    this_user: null,
    is_joined: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REDUX_EVENT_USER_JOIN_REQ_ACCEPTED:
            return {
                ...state,
                this_user: payload,
                is_joined: true,
            };

        case REDUX_EVENT_USER_LIST_UPDATED:
            return {
                ...state,
                users: payload,
                is_joined: true
            };

        default:
            return state;
    }

}

