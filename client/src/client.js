var nick;
while (!nick) {
    nick = prompt("Nickname:");
}
const socket = io();
socket.emit('newUser', nick);

const chatMessage = (messageObj) => {
    $('#chat').append($(`<li class="${messageObj['type']}">`).text(messageObj['text']));
    // var chat = document.getElementById('chat-wrapper');
    // chat.scrollTop = chat.scrollHeight;
};

// const onChatSend = (e) => {
//     e.preventDefault();
//     const input = document.querySelector('#chatMessage');
//     const text = input.value;
//     input.value = '';
//     socket.emit('message', {
//         type: 'chat',
//         text: text
//     });
// };

socket.on('message', chatMessage);

// socket.emit('serverLog', "test");

// when message is sent though chat input, emit messageto server
// document.querySelector('#chat-form').addEventListener('submit', onChatSend);
$('#chat-form').submit( (event) => {
    socket.emit('message', {
        type: 'chat',
        text: $('#chat-message').val()
    });
    $('#chat-message').val('');
    event.preventDefault();
});