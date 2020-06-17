import React from 'react'
import PropTypes from 'prop-types'

import './SplitApp.css';
function SplitApp(props) {
    return (
        <div className='container'>
            {props.children}
        </div>
    )
}

SplitApp.propTypes = {

}

export default SplitApp

