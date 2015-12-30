"use strict"

var { combineReducers } = require('redux')
import directories from './directories'
import files from './files'
import socket from './socket'
var immutable = require('immutable')

const combined = combineReducers({
  directories,
  files,
  socket
})

// module.exports = (state, action) => immutable.Map(combined(state.toObject(), action))
export default combined
