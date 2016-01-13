var fs = require('fs')

function getStats (f) {
  return new Promise(function (resolve, reject) {
    fs.stat(f, function (err, stat) {
      if (err) return reject(err)
      resolve(stat)
    })
  })
}

module.exports = function opendir (root, dir, opts = {}) {
  var p = dir === '/' ? '/' : dir + '/'

  return new Promise(function (resolve, reject) {
    fs.readdir(root + dir, function (err, files) {
      if (err) return reject(err)

      Promise.all(files.map(f => getStats(root+dir+'/'+f)))
      .then(function (stats) {
        var dir = {
          directories: [],
          files: [],
          name: dir === '/' ? '/' : dir.split('/').pop(),
          path: dir
        }
        stats.forEach(function (s, i) {
          if (s.isFile()) {
            dir.files.push({
              name: files[i],
              size: s.size,
              path: p + files[1],
            })
          } else {
            dir.directories.push({
              name: files[i],
              path: p + files[1],
            })
          }
        })
        resolve(dir)
      })
    })
  })
}
