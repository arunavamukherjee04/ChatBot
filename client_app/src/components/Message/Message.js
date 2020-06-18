import React from 'react'


import './Message.css';

export default function Message({ message, sender }) {
    const Message = (sender === 'this') ? (<p className='message this_user_message'>
        {message}

    </p>) : (
            <p className='message other_user_message'>
                {message}
            </p>
        )
    return (
        <div>
            {Message}
        </div>


    )
}
