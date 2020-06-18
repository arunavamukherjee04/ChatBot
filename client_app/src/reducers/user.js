import { USER_JOIN_REQ_ACCEPTED, NEW_USER_JOINED } from '../actions/types';

const initialState = {
    users: [],
    this_user: null,
    is_joined: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_JOIN_REQ_ACCEPTED:
            return {
                ...state,
                this_user: payload,
                is_joined: true,
            };

        case NEW_USER_JOINED:
            return {
                ...state,
                users: payload,
                is_joined: true
            };

        default:
            return state;
    }

}

