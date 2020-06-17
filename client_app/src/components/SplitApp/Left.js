import React from 'react'
import PropTypes from 'prop-types'

import './SplitApp.css';
function Left(props) {
    return (
        <div className='left-container'>
            {props.children}
        </div>
    )
}

Left.propTypes = {

}

export default Left

