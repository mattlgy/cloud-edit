"use strict"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import Store from "./store"
import App from "./components/app.jsx"
import { initShortcuts } from 'src/shortcuts'

const store = Store()

window.store = store

var io = require('socket.io-client')
var socket = io()

store.dispatch({
  type: 'SOCKET_CONNECTED',
  socket: socket
})

initShortcuts(store.dispatch)

socket.emit('readdir', '/')
socket.on('dir', function (dir) {
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
    <App />
  </Provider>
, document.getElementById('app'))
