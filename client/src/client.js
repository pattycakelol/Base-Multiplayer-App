var nick = "pat";
while (!nick) {
    nick = prompt("Nickname:");
}
const socket = io();
socket.emit('newUser', nick);

const chatMessage = (messageObj) => {
    $('#chat-messages').append($(`<li class="${messageObj['type']}">`).text(messageObj['text']));
    // if client is scrolled to the bottom, the chat will autoscroll with a new message
    if ($('#chat-messages').scrollTop() + 43 == $('#chat-messages')[0].scrollHeight - $('#chat-messages').height()) {
        $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight - $('#chat-messages').height());
    }
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