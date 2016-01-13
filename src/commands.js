import {
  saveCurrentFile
} from 'src/actions'

export const commandList = [
  {
    label: 'save',
    'value': 'save',
    fn: function (dispatch) { dispatch(saveCurrentFile()) }
  }
]

export function initCommands (dispatch) {
  return function (command) {
    let c = commandList.find(c => c.value === command)
    if (c) c.fn(dispatch)
  }
}
