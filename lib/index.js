var fs = require('fs')
var recursiveReaddir = require('recursive-readdir')
var jsDiff = require('diff')

function treeify (files) {
  var tree = {}

  files.forEach(function (p) {
    // var parts = p.split('/')
    var t = tree
    p.split('/').forEach(function (part, i, parts) {
      if (i === parts.length - 1) {
        if (!t[parts[i - 1]]) t[parts[i - 1]] = []
        t[parts[i - 1]].push(part)
        return
      }
      if (!tree[part]) tree[part] = {}
    })
  })

  return tree
}

exports.readdir =  function readDir (p, opts = {}) {
  return new Promise(function (resolve, reject) {
    recursiveReaddir(p, function (err, files) {
      if (err) return reject(err)

      return resolve(treeify(files))
    })
  })
}

function getStats (f) {
  return new Promise(function (resolve, reject) {
    fs.stat(f, function (err, stat) {
      if (err) return reject(err)

      resolve(stat)
    })
  })

}

exports.opendir = function opendir (p, opts = {}) {
  return new Promise(function (resolve, reject) {
    fs.readdir(p, function (err, files) {
      if (err) return reject(err)

      Promise.all(files.map(f => getStats(p+'/'+f)))
      .then(function (stats) {
        var dir = {
          directories: [],
          files: []
        }
        stats.forEach(function (s, i) {
          if (s.isFile()) {
            dir.files.push({
              name: files[i],
              size: s.size,
              // path: p + files[1],
            })
          } else {
            dir.directories.push({
              name: files[i],
              // path: p + files[1],
            })
          }
        })
        resolve(dir)
      })
    })
  })
}

exports.openFile = function openFile (p, opts = {}) {
  return new Promise(function (resolve, reject) {
    fs.readFile(p, 'utf8', function (err, contents) {
      if (err) return reject(err)
      resolve(contents)
    });
  })
}

exports.saveFile = function (p, diff, opts = {}) {
  console.log(p);
  console.log(diff);
  return new Promise(function (resolve, reject) {
    openFile(p).then(function (contents) {
      console.log(jsDiff.applyPatch(contents, diff))
      resolve(contents)
    }).catch(reject)
  })
}

exports.writeFile = function (p, contents, opts = {}) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(p, contents, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}
