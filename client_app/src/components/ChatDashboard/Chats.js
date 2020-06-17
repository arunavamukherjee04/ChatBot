import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Left from '../SplitApp/Left';
import Right from '../SplitApp/Right';
import NoUserAvailable from '../NoUserAvailable/NoUserAvailable';

import User from '../User/User'

import '../SplitApp/SplitApp.css';
import './Chat.css';


import Split from 'react-split'
const Chats = ({ users, this_user }) => {

    const OtherUsers = (this_user) && users.filter(user => user.user_id !== this_user.user_id);

    const LoggedInUsers = (OtherUsers && OtherUsers.length === 0) ? <NoUserAvailable /> : (OtherUsers) && OtherUsers.map(user => {
        return <User key={user.user_id} name={user.name} />
    });



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
                <Right>
                </Right>
            </Split>
        </div>
    )
}


const mapStateToProps = state => ({
    users: state.user.users,
    this_user: state.user.this_user
})

export default connect(mapStateToProps)(Chats);
