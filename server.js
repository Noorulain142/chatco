const express = require('express')
const path = require ('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
//set static folder
app.use(express.static(path.join(__dirname,'public')))

//run when client connects
io.on('connection', socket =>{
// welcome current user
socket.emit('message', 'Welcome to ChatCo' ) // single person who is connecting

//broadcast when user connects
socket.broadcast.emit('message', 'A user has joined the chat'); //emit to everpne except the user who is connecting

//runs when client disconnects
socket.on('disconnect', ()=> {
  io.emit('message', 'A user has left the chat') // this used when we need to notify everyone
})

// listen for chat message
socket.on('chatMessage', (msg)=> {
  io.emit('message',msg)
})
} )

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`server running at port ${PORT}`))
