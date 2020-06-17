import React from 'react'
import PropTypes from 'prop-types'

import './SplitApp.css';
function Right(props) {
    return (
        <div className='right-container'>
            {props.children}
        </div>
    )
}

Right.propTypes = {

}

export default Right

