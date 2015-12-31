"use strict"

import React, { Component, PropTypes } from 'react'

import FlexContainer from 'src/components/flex-container.jsx'
import FlexChild from 'src/components/flex-child.jsx'

import {
  openFile,
  editFile,
  saveFile,
  closeFile,
} from 'src/actions'

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

  onClose (path) {
    return (e) => {
      this.dispatch(closeFile(path))
    }
  }

  render () {
    return (<FlexChild flex={{ flexGrow: 1 }}>
      <FlexContainer flex={{ }}>
        { this.props.files.map(f =>
          <FlexChild key={ f.path }>
            <FlexContainer flex={{ }}>
              <FlexChild>
                <h4
                  style={{
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                  onClick={ this.openFile(f.path) }>
                    { f.dirty ? '~' : '' }{ f.name }
                </h4>
              </FlexChild>
              <FlexChild>
                <span onClick={ this.onClose(f.path) }>x</span>
              </FlexChild>
            </FlexContainer>
          </FlexChild>
        )}
      </FlexContainer>
      <div>
        { this.props.files.map(f =>
          <EditorPane
            file={ f }
            key={ f.path }
            onEdit={ this.onEdit(f.path) }
          />
        )}
      </div>
    </FlexChild>)
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
      <textarea value={ this.props.file.draft } onChange={ this.props.onEdit } />
    </div>)
  }
}
