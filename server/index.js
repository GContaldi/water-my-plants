var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var _ = require('underscore');

app.use('/', express.static(__dirname + '/..'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

var objectsState = [
  { object: 'pump', value: 'off' }
];

function sendState(socket, objectsState) {
  objectsState.forEach(function(objectState) {
    socket.emit('action', { type: 'NEW_READ', data: objectState });
  });
}

function actionHandler(socket, action) {
  switch(action.type) {
    case 'server/COMMAND':
      console.log('Got a command!', action.data);
      objectsState = updateState(objectsState, action.data);
      sendState(socket, objectsState);
      return;
    default:
      console.log('weird action', action);
      sendState(socket, objectsState);
      return;
  }
}

function updateState(objectsState, command) {
  return _.map(objectsState, function(objectState) {
    if (objectState.object === command.object) {
      objectState.value = command.value;
    }
    return objectState;
  });
}

io.on('connection', function(socket) {
  console.log('user connected: ' + socket.id);

  sendState(socket, objectsState);

  socket.on('action', actionHandler.bind(null, socket));
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on http://localhost:3000');
});
