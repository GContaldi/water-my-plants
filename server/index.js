var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var _ = require('underscore');
var componentGenerator = require('../lib/componentGenerator');

app.use('/', express.static(__dirname + '/..'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

var components = [
  componentGenerator('pump', 'actuator', 'off')
];

function sendComponentsData(socket, components) {
  console.log('Components:', JSON.stringify(components));
  components.forEach(function(component) {
    socket.emit('action', { type: 'NEW_READ', data: component });
  });
}

function actionHandler(socket, action) {
  switch(action.type) {
    case 'server/COMMAND':
      console.log('Got a command!', action.data);
      components = updateComponents(components, action.data);
      sendComponentsData(socket, components);
      return;
    default:
      console.log('weird action', action);
      sendComponentsData(socket, components);
      return;
  }
}

function updateComponents(components, command) {
  return _.map(components, function(component) {
    if (component.name === command.name) {
      component.value = command.value;
    }
    return component;
  });
}

io.on('connection', function(socket) {
  console.log('user connected: ' + socket.id);

  sendComponentsData(socket, components);

  socket.on('action', actionHandler.bind(null, socket));
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on http://localhost:3000');
});
