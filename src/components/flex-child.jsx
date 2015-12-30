"use strict"

import React, { Component, PropTypes } from 'react'

const childDefaults = {

}

export default function FlexChild (props) {
    let style = Object.assign({}, childDefaults, props.flex)
    return (<div style={ style }>
        { props.children }
    </div>)
}
