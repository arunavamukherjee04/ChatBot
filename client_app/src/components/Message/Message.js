import React from 'react'


import './Message.css';

export default function Message({ message, sender }) {
    const Message = ((message, sender) => {
        switch (sender) {
            case 'this':
                return (<p className='message this_user_message'>
                    {message}
                </p>)

            case 'other':
                return  (
                    <p className='message other_user_message'>
                        {message}
                    </p>
                );
            case 'system':
                return (
                    <p className='message notification_user_message'>
                        {message}
                    </p>
                )
        }
    })(message, sender);
    return (
        <div>
            {Message}
        </div>


    )
}
