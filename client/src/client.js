const writeEvent = (text) => {
    // <ul> element
    var parent = document.querySelector('#chat');

    // <li> element
    const chatElement = document.createElement('li');
    chatElement.innerHTML = text;

    parent.appendChild(chatElement);
};

const onChatSend = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chatMessage');
    const text = input.value;
    input.value = '';
    sock.emit('message', text);
};

//writeEvent('Welcome to the chat');

const sock = io();
sock.on('message', writeEvent);
//sock.emit('serverLog', "hello");
document.querySelector('#chat-form').addEventListener('submit', onChatSend);