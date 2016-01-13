var fs = require('fs')

function getStats (f) {
  return new Promise(function (resolve, reject) {
    fs.stat(f, function (err, stat) {
      if (err) return reject(err)
      resolve(stat)
    })
  })
}

module.exports = function readdir (root, path, opts = {}) {
  var p = path === '/' ? '/' : path + '/'

  return new Promise(function (resolve, reject) {
    fs.readdir(root + path, function (err, files) {
      if (err) return reject(err)

      Promise.all(files.map(f => getStats(root+path+'/'+f)))
      .then(function (stats) {
        var dir = {
          directories: [],
          files: [],
          name: path === '/' ? '/' : path.split('/').pop(),
          path: path
        }
        stats.forEach(function (s, i) {
          if (s.isFile()) {
            dir.files.push({
              name: files[i],
              size: s.size,
              path: p + files[i],
            })
          } else {
            dir.directories.push({
              name: files[i],
              path: p + files[i],
            })
          }
        })
        resolve(dir)
      }).catch(reject)
    })
  })
}
