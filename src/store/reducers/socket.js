"use strict"

import {
  SOCKET_CONNECTED
} from "../../actions"

export default function socket (state = {}, action) {
  switch (action.type) {
  case SOCKET_CONNECTED:
    return Object.assign({}, state, {
      io: action.socket
    })
  default:
    return state;
  }
}
