import axios from 'axios';
import { USER_JOIN_REQ_ACCEPTED, NEW_USER_JOINED } from './types';

/**
 * Join the user
 */

 
export const join_user = (name) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({
        name
    });

    try {
        const res = await axios.post('/user', body, config);

        if (res.data.msg === 'USER_CREATED') {
            dispatch({
                type: USER_JOIN_REQ_ACCEPTED,
                payload: res.data
            });
        }
    } catch (error) {

    }
} 