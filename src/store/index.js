"use strict"

var { createStore, applyMiddleware } = require('redux')
// var thunkMiddleware = require('./middleware/thunk')
import thunkMiddleware from './middleware/thunk'
var loggerMiddleware = require('./middleware/logger')
// var rootReducer = require('./reducers')
import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

module.exports = function Store (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
