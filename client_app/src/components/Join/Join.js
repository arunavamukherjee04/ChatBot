import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect } from 'react-router-dom';

import { join_user } from '../../actions/user'

import './Join.css';

const JoinForm = ({ join_user, is_joined, this_user }) => {
    const [name, setName] = useState('');

    const join = (oEvent) => {
        oEvent.preventDefault();
        join_user(name)
    }

    if(is_joined && this_user) {
        return <Redirect to='/chats'/>
    }

    return (
        <form className="auth-form" onSubmit={join}>
            <p className="jumbo-text">
                Welcome to the ChatBot.
            </p>
            <div className="form-control">
                <input type="text" id="name" placeholder="Enter your name here..." onChange={(oEvent => setName(oEvent.target.value))} className='join_form_name'/>
            </div>
            <div className="form-action">
                <button type="submit">Join</button>
            </div>
        </form>
    );
};

JoinForm.propTypes = {
    join_user: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    is_joined: state.user.is_joined,
    this_user: state.user.this_user
})


export default connect(mapStateToProps, { join_user })(JoinForm);