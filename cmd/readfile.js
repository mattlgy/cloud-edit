var fs = require('fs')

module.exports = function readfile (root, path, opts = {}) {
  return new Promise(function (resolve, reject) {
    fs.readFile(root + path, 'utf8', function (err, contents) {
      if (err) return reject(err)
      resolve({
        name: path.split('/').pop(),
        path: path,
        contents: contents
      })
    });
  })
}
