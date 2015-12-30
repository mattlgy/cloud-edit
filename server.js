// var readDir = require('./lib').readDir
// var io = require('socket.io')
//
// io.on('connection', function (socket) {
//   console.log(socket)
// })
//
// readDir('./dir')
// .catch(function (err) {
//   console.log(err)
// })
// .then(function (files) {
//   console.log(files)
// })

var ROOT = './dir'

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var readdir = require('./lib').readdir
var opendir = require('./lib').opendir
var openFile = require('./lib').openFile
var saveFile = require('./lib').saveFile
var writeFile = require('./lib').writeFile

app.get('/', function (req, res) { res.sendFile(__dirname + '/www/index.html') })
app.get('/cloud-edit.js', function (req, res) { res.sendFile(__dirname + '/www/cloud-edit.js') })

io.on('connection', function (socket){
  socket.on('readdir', function (dir) {
    opendir(ROOT + dir).then(function (files) {
      var p = ''
      if (dir == '/') {
        p = '/'
        files.name = '/'
      }  else {
        p = dir + '/'
        files.name = dir.split('/').pop()
      }
      files.path = dir
      files.directories = files.directories.map((d) => {
        return {
          name: d.name,
          path: p + d.name,
        }
      })
      files.files = files.files.map((f) => {
        return {
          name: f.name,
          size: f.size,
          path: p + f.name,
        }
      })
      socket.emit('dir', files)
    })
  })

  socket.on('readfile', function (path) {
    openFile(ROOT + path).then(function (contents) {
      var name = path.split('/').pop()
      socket.emit('file', {
        name,
        path,
        contents,
      })
    })
  })

  socket.on('editfile', function (path, diff) {
    saveFile(ROOT + path, diff)
    .catch(function (err) {
      console.log(err)
    })
    .then(function (contents) {
      var name = path.split('/').pop()
      socket.emit('file', {
        name,
        path,
        contents,
      })
    })
  })

  socket.on('writefile', function (path, contents) {
    writeFile(ROOT + path, contents)
    .catch(function (err) {
      console.log(err)
    })
    .then(function () {
      var name = path.split('/').pop()
      socket.emit('file', {
        name,
        path,
        contents,
      })
    })
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})
