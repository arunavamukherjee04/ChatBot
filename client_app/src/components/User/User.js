import React from 'react'
import PropTypes from 'prop-types'

function User({name, is_online}) {
    return (
        <li>
            {name}
        </li>
    )
}

User.propTypes = {

}

export default User

