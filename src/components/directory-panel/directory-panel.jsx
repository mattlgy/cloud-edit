"use strict"

import React, { Component, PropTypes } from 'react'
import DirectoryTree from './directory-tree.jsx'
import {
  expandDirectory,
  colapseDirectory,
  openFile,
} from '../../actions'

export default class DirectoryPannel extends Component {
  constructor (props, context) {
    super(props, context)
    this.dispatch = props.dispatch
  }

  onDirectoryClick (path) {
    if (!this.props.directories[path] || !this.props.directories[path].expanded) {
      this.dispatch(expandDirectory(path))
    } else {
      this.dispatch(colapseDirectory(path))
    }
  }

  onFileClick (path) {
    this.dispatch(openFile(path))
  }

  render () {
    return <div className="directory-panel">
      <ul>
        <li>
          <DirectoryTree
            tree={ this.props.directoryTree }
            directories={ this.props.directories }
            onDirectoryClick={ this.onDirectoryClick.bind(this) }
            onFileClick={ this.onFileClick.bind(this) }
          />
        </li>
      </ul>
    </div>
  }
}
// DirectoryPannel.propTypes = @TODO
