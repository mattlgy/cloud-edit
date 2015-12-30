"use strict"

import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import DirectoryPanel from './directory-panel/directory-panel.jsx'
import { Editor } from './editor.jsx'

class App extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.dispatch = props.dispatch
  }

  render () {
    return (
      <div>
        <DirectoryPanel
          dispatch={ this.props.dispatch }
          directoryTree={ this.props.directoryTree }
          directories={ this.props.directories }
        />
        <Editor files={ this.props.files } dispatch={ this.props.dispatch } />
      </div>
    )
  }
}
// App.propTypes = @TODO

function treeify (dir, directories) {
  var files = dir.files //.map(f => f.name)
  var directories = dir.directories.map((d) => {
    if (!directories[d.path]) return d
    return treeify(directories[d.path], directories)
  })
  return {
    files,
    directories,
    path: dir.path,
    name: dir.name,
  }
}

function select (state) {
  return {
    directories: state.directories,
    files: state.files,
    directoryTree: treeify(state.directories['/'], state.directories)
  }
}

module.exports = connect(select)(App)
