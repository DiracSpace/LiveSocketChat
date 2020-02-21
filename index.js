var express = require('express');
var back_socket = require('socket.io');

// app setup
var app = express();
var server = app.listen(4444, function() {
    console.log("Listening to requests on port 4444.. ");
});
/* end */

// static files
app.use(express.static('public'));
/* end */

// socket setup
var io = back_socket(server);
io.on('connection', function(back_socket) {
    console.log('made socket connection ' + back_socket.id);
    back_socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
    back_socket.on('typing', function(data) {
        back_socket.broadcast.emit('typing', data);
    });
});
/* end */