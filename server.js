var ROOT = './dir'

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var readdir = require('./cmd/readdir')
var readfile = require('./cmd/readfile')
var writefile = require('./cmd/writefile')

app.get('/', function (req, res) { res.sendFile(__dirname + '/www/index.html') })
app.get('/cloud-edit.js', function (req, res) { res.sendFile(__dirname + '/www/cloud-edit.js') })

io.on('connection', function (socket){
  socket.on('readdir', function (dir) {
    readdir(ROOT, dir).then(function (files) {
      socket.emit('dir', files)
    }).catch(function (err) {
      console.error(err)
    })
  })

  socket.on('readfile', function (dir) {
    readfile(ROOT, dir).then(function (file) {
      socket.emit('file', file)
    }).catch(function (err) {
      console.error(err)
    })
  })

  socket.on('writefile', function (path, contents) {
    writefile(ROOT, path, contents).then(function (file) {
      socket.emit('file', file)
    }).catch(function (err) {
      console.error(err)
    })
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})
