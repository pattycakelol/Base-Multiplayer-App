const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
<<<<<<< HEAD:server.js
const clientPath = `${__dirname}/public`;
=======
const clientPath = `${__dirname}/client/src`;
>>>>>>> b988d0e904681f7febb37db40106b1ff82f36c55:server.js
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

var clients = [];           // array of objects -> { socket: socket, nickname: nickname }
var clientsDict = {};       // dictionary -> key = socket.id, value = client object(^)
var messages = [];          // array of objects -> { type: 'system'|'chat'|'error', text: message }

// io.emit() -> send to everyone
// socket.emit() -> send to individual client
io.on('connection', (socket) => {
    // recieve connections
    socket.on('newUser', (name) => {
        if (name !== null) {
            socket['nickname'] = name.trim();
        }
        clients.push(socket);
        clientsDict[socket.id] = socket;

        // display previous messages
        for (var i = 0; i < messages.length; i++) {
            socket.emit('message', messages[i]);
        }
        console.log(`Connection: ${socket.id} \t as ${socket['nickname']}`);
        connectMsg = {
            type: 'system',
            text: socket['nickname'] + " connected."
        };
        io.emit('message', connectMsg);
        messages.push(connectMsg);
    });

    // message everyone the text recieved by client via chat
    socket.on('message', (messageObj) => {
        console.log(socket.id + ": " + messageObj['text']);
        switch (messageObj['type']) {
            case 'command':
                // for messages that start with '/' (ex: '/players')
                break;
            case 'chat':
                messageObj['text'] = socket['nickname'] + ": " + messageObj['text'];
                io.emit('message', (messageObj));
                break;
            default:
                console.log("Something went wrong with chat messages!"); 
                break;
        }
        // finally, add message to message array
        messages.push(messageObj);
    });

    // client logs an event in the server's log (not sure if I'll need this)
    socket.on('serverLog', (text) => {
        console.log(socket.id + " logged: " + text);
    });

    socket.on('disconnect', () => {
        var i = clients.indexOf(socket);
        clients.splice(i, 1);
        delete clientsDict[socket.id];
        console.log(`Disconnect: ${socket.id} \t as ${socket['nickname']}`);

        disconnectMsg = {
            type: 'system',
            text: socket['nickname'] + " disconnected."
        };
        io.emit('message', disconnectMsg);

        messages.push(disconnectMsg);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const port = 3000;
server.listen(port, () =>  {
    console.log('Multiplayer app started on port ' + port);
});