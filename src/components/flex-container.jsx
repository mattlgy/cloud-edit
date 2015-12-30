"use strict"

import React, { Component, PropTypes } from 'react'

const containerDefaults = {
    display: 'flex',
    flexDirection: 'row',
}

export default function FlexContainer (props) {
    let style = Object.assign({}, containerDefaults, props.flex)
    return (<div style={ style }>
        { props.children }
    </div>)
}
