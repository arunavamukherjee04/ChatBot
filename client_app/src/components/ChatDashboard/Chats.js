import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Left from '../SplitApp/Left';
import Right from '../SplitApp/Right';
import NoUserAvailable from '../NoUserAvailable/NoUserAvailable';
import Message from '../Message/Message';
import User from '../User/User'

import '../SplitApp/SplitApp.css';
import './Chat.css';

import {Redirect } from 'react-router-dom';

import { MdSend } from "react-icons/md";


import { send_chat_request, send_message, load_old_messages } from '../../actions/chat';

import PrivateChat from '../../Util/PrivateChat';
import ChatStatus from '../../Util/ChatStatus';
import ChatStatusENUM from '../../Util/ChatStatusENUM';


import Split from 'react-split'
const Chats = ({
    users,
    this_user,
    chat_with,
    send_chat_request,
    send_message,
    is_requested,
    is_approved,
    messages,
    load_old_messages

}) => {
    if(this_user === null) {
        return <Redirect to='/join'/>
    }

    const message_element = React.createRef();

    const OtherUsers = (this_user) && users.filter(user => user.user_id !== this_user.user_id);

    const LoggedInUsers = (OtherUsers && OtherUsers.length === 0) ? <NoUserAvailable /> : (OtherUsers) && OtherUsers.map(user => {
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

    const onPressSendRequest = () => {
        send_chat_request(this_user, chat_with);
    }

    const clickOnUser = (user) => {
        load_old_messages(user);
    }

    const EnableChatComponent = (is_approved) ? (<form className='message-type-box form-control' onSubmit={onPressSend}>
        <input type='text' id='message-box' placeholder='Type a message' ref={message_element} />
        <button type="submit"><MdSend /></button>
    </form>) : (is_requested && !is_approved) ? (<p>Awaiting Confirmation</p>) : (chat_with !== null) ? (<form className='chat_req_form form-control' onSubmit={onPressSendRequest}>
        <button type="submit">Send Request</button>
    </form>) : <span></span>;




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
                        {
                            MessageComponents
                        }
                    </div>
                    {
                        EnableChatComponent
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
    is_requested: state.chat.is_requested,
    is_approved: state.chat.is_approved,
    messages: state.chat.messages
})

export default connect(mapStateToProps, { send_chat_request, send_message, load_old_messages })(Chats);
