import React from 'react'

import './SplitApp.css';
function Right(props) {
    return (
        <div className='right-container'>
            {props.children}
        </div>
    )
}

export default Right

