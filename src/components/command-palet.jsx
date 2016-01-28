"use strict"

import React, { Component, PropTypes } from 'react'

export default class CommandPalet extends Component {
  constructor (props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {
      text: ""
    }
  }

  onSelect (e) {
    console.log(e)
  }

  render () {
    let commands = this.props.commands
    .filter((cmd) => cmd.label.indexOf(this.state.text) >= 0 )
    .map((cmd) => <li>{ cmd.label }</li>)

    return <div>
      <input onKeyUp={(e) => {
        this.setState({text: e.target.value})
      }} />
      <ul>
        { commands }
      </ul>
    </div>
  }
}
