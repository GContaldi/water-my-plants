var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket) {

  console.log('user connected: ' + socket.id);

  socket.on('action', function(action) {
    if(action.type === 'server/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', { type:'message', data: 'good day!' });
    }
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
