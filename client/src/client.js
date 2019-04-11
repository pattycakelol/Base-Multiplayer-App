var nick = "pat";
while (!nick) {
    nick = prompt("Nickname:");
}
const socket = io();
socket.emit('newUser', nick);

const chatMessage = (messageObj) => {
    $('#chat-messages').append($(`<li class="${messageObj['type']}">`).text(messageObj['text']));
    $('#chat-messages').scrollTop($(document).height());
};

socket.on('message', chatMessage);

// when message is sent though chat input, emit message to server
$('#chat-form').submit( (event) => {
    socket.emit('message', {
        type: 'chat',
        text: $('#chat-input').val()
    });
    $('#chat-input').val('');
    event.preventDefault();
});