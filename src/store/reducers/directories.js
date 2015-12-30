"use strict"

// import immutable from 'immutable'
// const initialState = immutable.Map({})

import {
  DIRECTORIE_LOADED,
  EXPAND_DIRECTORY,
  COLAPSE_DIRECTORY,
} from "../../actions"

const initialState = {
  '/': {
    path: '/',
    name: '/',
    directories: [],
    files: []
  }
}

export default function directories (state = initialState, action) {
  switch (action.type) {
  case DIRECTORIE_LOADED:
    // return state.set(action.path, immutable.List())
    return Object.assign({}, state, {
      [action.path]: {
        path: action.path,
        name: action.name,
        files: action.files,
        directories: action.directories,
        expanded: true
      }
    })
    case EXPAND_DIRECTORY:
      return Object.assign({}, state, { [action.path]: Object.assign({}, state[action.path], {
        expanded: true
      })})
    case COLAPSE_DIRECTORY:
    return Object.assign({}, state, { [action.path]: Object.assign({}, state[action.path], {
      expanded: false
    })})
  default:
    return state;
  }
}
