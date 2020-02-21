// make connection 
var front_socket = io.connect('http://localhost:4444');
/* end */

// DOM querying 
var message = document.getElementById("message");
    handle = document.getElementById("handle");
    btnSend = document.getElementById("send");
    output = document.getElementById("output");
    feedback = document.getElementById("feedback");
/* end */

// events
btnSend.addEventListener('click', function() {
    front_socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function() {
    front_socket.emit('typing', handle.value);
});

/* end */

// listen and display DOM
front_socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': '  + '</strong>' + data.message + '</p>';
});

front_socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>'+ data + ' is typing a message </em></p>';
});
/* end */