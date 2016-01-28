"use strict"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import Store from "./store"
import App from "./components/app.jsx"
import { initShortcuts } from 'src/shortcuts'
import { initCommands, commands } from 'src/commands'

const store = new Store()

window.store = store

var io = require('socket.io-client')
var socket = io()

store.dispatch({
  type: 'SOCKET_CONNECTED',
  socket: socket
})

initShortcuts(store.dispatch)
var onCommand = initCommands(store.dispatch)

socket.emit('readdir', '/')
socket.on('dir', function (dir) {
  console.log(dir)
  store.dispatch({
    type: "DIRECTORIE_LOADED",
    path: dir.path,
    name: dir.name,
    files: dir.files,
    directories: dir.directories,
  })
})
socket.on('file', function (file) {
  store.dispatch({
    type: "FILE_LOADED",
    path: file.path,
    name: file.name,
    content: file.contents,
  })
})

ReactDOM.render(
  <Provider store={store}>
    <App onCommand={ onCommand } commands={ commands } />
  </Provider>
, document.getElementById('app'))
