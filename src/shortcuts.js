import {
  saveCurrentFile
} from 'src/actions'

export const shortcuts = [
  {
    key: 's',
    ctrl: true,
    fn: function (e, dispatch) { dispatch(saveCurrentFile()) }
  },
]

const keyMap = {
  's' : 83,
}

function check (e, shortcut) {
  return (e.keyCode == keyMap[shortcut.key] && (!shortcut.ctrl || (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)))
}

export function initShortcuts (dispatch) {
  document.addEventListener("keydown", function(e) {
    for (var i = 0; i < shortcuts.length; i++) {
      if (check(e, shortcuts[i])) {
        e.preventDefault()
        shortcuts[i].fn(e, dispatch)
      }
    }
  }, false)
}
