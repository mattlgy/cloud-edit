"use strict"

// const thunk = store => next => action =>
//   typeof action === 'function' ?
//     action(store.dispatch, store.getState) :
//     next(action);
//
// module.exports = thunk

export default function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}
