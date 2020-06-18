import React from 'react'

import './SplitApp.css';
function Left(props) {
    return (
        <div className='left-container'>
            {props.children}
        </div>
    )
}

export default Left

