"use strict"

export const DIRECTORIE_LOADED = 'DIRECTORIE_LOADED'
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED'

export const EXPAND_DIRECTORY = 'EXPAND_DIRECTORY'
export const COLAPSE_DIRECTORY = 'COLAPSE_DIRECTORY'

export const FILE_LOADED = 'FILE_LOADED'
export const FILE_EXPAND = 'FILE_EXPAND'
export const FILE_CLOSE = 'FILE_CLOSE'
export const FILE_EDIT = 'FILE_EDIT'

export function loadDirecrtory (dir) {
  return function (dispatch) {

  }
}

export function expandDirectory (dir) {
  return function (dispatch, getState) {
    if (getState().directories[dir]) {
      return dispatch({
        type: EXPAND_DIRECTORY,
        path: dir
      })
    }
    getState().socket.io.emit('readdir', dir)
  }
}

export function colapseDirectory (dir) {
  return {
    type: COLAPSE_DIRECTORY,
    path: dir
  }
}

export function openFile (path) {
  return function (dispatch, getState) {
    if (getState().files.find(f => f.path === path)) {
      return dispatch({
        type: FILE_EXPAND,
        path: path,
      })
    }
    getState().socket.io.emit('readfile', path)
  }
}

export function closeFile (path) {
    return {
      type: FILE_CLOSE,
      path: path
    }
}

export function editFile (path, draft) {
  return {
    type: FILE_EDIT,
    path,
    draft,
  }
}

export function saveFile (path) {
  return function (dispatch, getState) {
    let file = getState().files.find(f => f.path === path)
    getState().socket.io.emit('writefile', path, file.draft)
  }
}

export function saveCurrentFile () {
  return function (dispatch, getState) {
    let file = getState().files.find(f => f.expanded)
    dispatch(saveFile(file.path))
  }
}
