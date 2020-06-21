import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Left from '../SplitApp/Left';
import Right from '../SplitApp/Right';
import Message from '../Message/Message';
import User from '../User/User'

import '../SplitApp/SplitApp.css';
import './Chat.css';

import { Redirect } from 'react-router-dom';

import { MdSend } from "react-icons/md";


import { send_chat_request, send_message, load_old_messages, chatRequestResponse } from '../../actions/chat';

import PrivateChat from '../../Util/PrivateChat';
import {
    REQUESTED,
    APPROVED,
    NONE,
    REQUEST_RECEIVED
} from '../../Util/ChatStatusENUM';


import Split from 'react-split'
const Chats = ({
    users,
    this_user,
    chat_with,
    send_chat_request,
    send_message,
    messages,
    load_old_messages,
    chat_status,
    chatRequestResponse

}) => {
    if (this_user === null) {
        return <Redirect to='/' />
    }

    const message_element = React.createRef();

    const OtherUsers = (this_user) && users.filter(user => user.user_id !== this_user.user_id);

    const LoggedInUsers = (OtherUsers && OtherUsers.length === 0) ? (<div className='no_user_messge_container'>
        <span>No User Available currently</span>
    </div>) : (OtherUsers) && OtherUsers.map(user => {
        return <User key={user.user_id} user={user} click={(user) => clickOnUser(user)} />
    });

    const MessageComponents = messages.map(message => {
        const { message_id, is_msg_received, is_msg_sent, msg } = message
        const sender = (!is_msg_received && is_msg_sent) ? 'this' : 'other'
        return <Message key={message_id} message={msg} sender={sender} />
    });


    const onPressSend = (oEvent) => {
        oEvent.preventDefault();
        if (message_element.current.value !== '') {
            const _message = {
                message_id: uuidv4(),
                is_msg_received: false,
                is_msg_sent: true,
                msg: message_element.current.value
            }

            send_message(this_user, chat_with, _message);

            const private_message = {
                chat_with,
                message: _message
            }

            PrivateChat.add(private_message);
            message_element.current.value = '';
        }

    }

    const onPressSendRequest = (oEvent) => {
        oEvent.preventDefault();
        send_chat_request(this_user, chat_with);
    }

    const clickOnUser = (user) => {
        load_old_messages(user);
    }

    const sendResponse = (isAccepted) => {
        chatRequestResponse(isAccepted, this_user, chat_with);
    }

    const EnableChatComponent = () => {
        if (chat_with !== null) {
            switch (chat_status) {
                case NONE:
                    return <form className='chat_req_form form-control' onSubmit={onPressSendRequest}>
                        <button type="submit">Send Request</button>
                    </form>
                case REQUESTED:
                    return <div className='chat_req_form form-control'>
                        <span className='chat_status'>
                            Awaiting Confirmation...
                        </span>
                    </div>
                case APPROVED:
                    return <form className='message-type-box form-control' onSubmit={onPressSend}>
                        <input type='text' id='message-box' placeholder='Type a message' ref={message_element} />
                        <button type="submit"><MdSend /></button>
                    </form>
                case REQUEST_RECEIVED:
                    return <div className='chat_req_form form-control'>
                        <span>
                            <button className='btn_type_success' onClick={() => { sendResponse(true) }}>Accept</button>
                        </span>
                    </div>
                default:
                    return <span></span>
            }
        } else {
            return <span></span>
        }

    }

    return (
        <div className='container'>
            <Split sizes={[25, 75]}>
                <Left>
                    {
                        <ul className='users-list'>
                            {
                                LoggedInUsers
                            }
                        </ul>
                    }

                </Left>
                <Right className='right-panel'>
                    <div className='header'>
                        {(chat_with) && (<span>{chat_with.name}</span>)}

                    </div>

                    <div className='message-panel'>
                        {chat_with && chat_status === REQUEST_RECEIVED && (<Message message={chat_with.name.concat(' wants to chat with you...')} sender='system' />)}
                        {
                            MessageComponents
                        }
                    </div>
                    {
                        <EnableChatComponent />
                    }

                </Right>
            </Split>
        </div>
    )
}


const mapStateToProps = state => ({
    users: state.user.users,
    this_user: state.user.this_user,

    chat_with: state.chat.chat_with,
    messages: state.chat.messages,
    chat_status: state.chat.chat_status

})

export default connect(mapStateToProps, { send_chat_request, send_message, load_old_messages, chatRequestResponse })(Chats);
