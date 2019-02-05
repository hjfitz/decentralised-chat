const http = require('http')
const express = require('express')
const path = require('path')
const app = express()

const server = http.createServer(app)

app.use((req, res, next) => {
	console.log(`${new Date()} :: ${req.originalUrl} :: ${req.method}`)
	next()
})

app.use('/', express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(server)
const p2p = require('socket.io-p2p-server').Server

io.use(p2p)

io.on('connection', function (socket) {
	socket.on('peer-msg', function (data) {
	  console.log('Message from peer: %s', data)
	  io.emit('peer-msg', data)
	})  
	socket.on('go-private', function (data) {
		console.log('clients escalating to WebRTC')
	  io.emit('go-private', data)
	})
})

server.listen(8080, () => console.log('listening on 8080'))