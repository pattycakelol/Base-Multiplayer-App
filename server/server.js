const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

var clients = [];           // array of objects -> { id: socket.id, nickname: nickname }
var clientsDict = {};       // dictionary -> key = socket.id, value = client object(^)
var messages = [];          // array of objects -> { type: 'system'|'chat'|'error', text: message }

// io.emit() -> send to everyone
// socket.emit() -> send to individual client
io.on('connection', (socket) => {
    var nickname;
    // recieve connections
    socket.on('newUser', (name) => {
        nickname = name;

        var newClient = {
            id: socket.id,
            nickname: nickname
        };
        clients.push(newClient);
        clientsDict[socket.id] = newClient;

        // display previous messages
        for (var i = 0; i < messages.length; i++) {
            socket.emit('message', messages[i]);
        }

        console.log(`Connection: ${socket.id} \t as ${nickname}`);
        io.emit('message', {
            type: 'chat', 
            text: nickname + " connected."
        });
        socket.emit('message', {
            type: 'chat',
            text: "Welcome to base multiplayer app!"
        });
    });

    // message everyone the text recieved by client via chat
    socket.on('message', (messageObj) => {
        console.log(socket.id + ": " + messageObj['text']);
        switch (messageObj['type']) {
            case 'command':
                // for messages that start with '/' (ex: '/players')
            case 'chat':
                io.emit('message', (messageObj));
            default:
                console.log("Something went wrong with chat messages!");
        }
    });

    // client logs an event in the server's log (not sure if I'll need this)
    socket.on('serverLog', (text) => {
        console.log(socket.id + " logged: " + text);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const port = 3000;
server.listen(port, () =>  {
    console.log('Multiplayer app started on port ' + port);
});