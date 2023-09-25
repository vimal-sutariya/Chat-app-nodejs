const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (newMsg) => {
        io.emit('message', newMsg);
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        io.emit('message', `https://www.google.com/maps?q=${longitude},${latitude}`)
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    })
})

server.listen(port, () => {
    console.log('Server is running on port : '+ port);
})
