var fs = require('fs')

module.exports = function (root, path, contents, opts = {}) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(root + path, contents, function (err) {
      if (err) return reject(err)
      resolve({
        name: path.split('/').pop(),
        path: path,
        contents: contents
      })
    })
  })
}
