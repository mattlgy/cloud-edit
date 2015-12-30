"use strict"

import React, { Component, PropTypes } from 'react'
import {
  openFile,
  editFile,
  saveFile,
} from '../actions'

export class Editor extends Component {
  constructor (props, context) {
    super(props, context)
    this.dispatch = props.dispatch
  }

  openFile (path) {
    return (e) => {
      this.dispatch(openFile(path))
    }
  }

  onEdit (path) {
    return (e) => {
      this.dispatch(editFile(path, e.target.value))
    }
  }

  onSave (path) {
    return (e) => {
      this.dispatch(saveFile(path))
    }
  }

  render () {
    return (<div>
      <ul>
        { this.props.files.map(f =>
          <li key={ f.path }>
            <h4 onClick={ this.openFile(f.path) }>{ f.name }</h4>
          </li>
        )}
      </ul>
      <div>
        { this.props.files.map(f =>
          <EditorPane
            file={ f }
            key={ f.path }
            onEdit={ this.onEdit(f.path) }
            onSave={ this.onSave(f.path) }
          />
        )}
      </div>
    </div>)
  }
}

class EditorPane extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    var style = {}
    if (!this.props.file.expanded) style.display = 'none'
    return (<div style={ style }>
      <button onClick={ this.props.onSave }>save</button>
      <textarea value={ this.props.file.draft } onChange={ this.props.onEdit } />
    </div>)
  }
}
