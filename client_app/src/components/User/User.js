import React from 'react'

function User({user, click}) {
    return (
        <li onClick={() => click(user)}>
            {user.name}
        </li>
    )
}

export default User

