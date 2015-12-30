"use strict"

import React, { Component, PropTypes } from 'react'

export default class DirectoryTree extends Component {
  constructor (props, context) {
    super(props, context)
    this.name = this.props.tree.name
    this.path = this.props.tree.path
  }

  onDirectoryClick (e) {
    console.log('foo')
    console.log(this.props.onDirectoryClick);
    if (this.props.onDirectoryClick) this.props.onDirectoryClick(this.path)
  }

  onFileClick (path) {
    return (e) => {
      if (this.props.onFileClick) this.props.onFileClick(path)
    }
  }

  render () {
    var isExpanded = this.props.directories[this.path] && this.props.directories[this.path].expanded

    var directoriesList = null
    if (this.props.tree.directories && isExpanded)
      directoriesList = (<ul> { this.props.tree.directories.map(d => <li key={ d.path }>
        <DirectoryTree
          tree={ d }
          directories={ this.props.directories }
          onDirectoryClick={ this.props.onDirectoryClick }
          onFileClick={ this.props.onFileClick }
        />
      </li>) } </ul>)

    var fileList = null
    if (this.props.tree.files && isExpanded)
      fileList = (<ul> { this.props.tree.files.map(f => <li key={ f.path }>
        <h4 onClick={ this.onFileClick(f.path) } >{ f.name }</h4>
      </li>) } </ul>)

    return (
      <div>
        <h3 onClick={ (e) => this.onDirectoryClick(e) }>{ this.name }</h3>
          { directoriesList }
          { fileList }
      </div>
    )
  }
}
// DirTree.propTypes = @TODO
