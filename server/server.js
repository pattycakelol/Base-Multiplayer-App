const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));
const server = http.createServer(app);

const io = socketio(server);

// io.emit -> send to everyone
// sock.emit -> send to individual client
io.on('connection', (sock) => {
    console.log(sock.id + " connected.");
    // message everyone that client has connected
    io.emit('message', sock.id + " connected.");

    // message sent only to client on connection
    sock.emit('message', "Welcome to base multiplayer app!");

    // message everyone the text recieved by client via chat
    sock.on('message', (text) => { 
        console.log(sock.id + ": " + text);
        io.emit('message', text);
    });

    // client logs an event in the server's log (not sure if I'll need this)
    sock.on('serverLog', (text) => {
        console.log(sock.id + " logged: " + text);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const port = 3000;
server.listen(port, () =>  {
    console.log('Multiplayer app started on port ' + port);
});