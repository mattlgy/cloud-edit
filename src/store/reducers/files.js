"use strict"

// import immutable from 'immutable'
// const initialState = immutable.Map({})

import {
  FILE_LOADED,
  FILE_CLOSE,
  FILE_EXPAND,
  FILE_EDIT,
} from "../../actions"

const initialState = []

function colapseAll (files) {
  return files.map(f => Object.assign({}, f, { expanded: false }))
}

export default function files (state = initialState, action) {
  switch (action.type) {
    case FILE_LOADED:
      let found = false
      let files = state.map((f) => {
        if (f.path !== action.path) return f
        found = true
        return Object.assign({}, f, {
          content: action.contents,
        })
      })
      if (found) return files
      console.log('poo');
      return colapseAll(state).concat({
        name: action.name,
        path: action.path,
        content: action.contents,
        draft: action.contents,
        expanded: true,
      })
    case FILE_EXPAND:
      return state.map(f => Object.assign({}, f, { expanded: f.path === action.path }))
    case FILE_CLOSE:
      return state.filter(f => f.path !== action.path)
    case FILE_EDIT:
      return state.map(f => Object.assign({}, f, { draft: f.path === action.path ? action.draft : f.draft }))
    default:
      return state;
  }
}
