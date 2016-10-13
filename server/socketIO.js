import socketIO from 'socket.io';
import _ from 'underscore';
import { http } from './express';

export const io = socketIO(http);

const components = [
  {
    name: 'pump',
    type: 'actuator',
    value: 'off'
  }
];

function sendComponentsData(socket) {
  components.forEach(function(component) {
    socket.emit('action', { type: 'NEW_READ', data: component });
  });
}

function updateComponents(command) {
  return _.map(components, function(component) {
    if (component.name === command.name) {
      component.value = command.value;
    }
    return component;
  });
}

function actionHandler(socket, action) {
  switch (action.type) {
    case 'server/COMMAND':
      console.log('Got a command!', action.data);
      updateComponents(action.data);
      return;
    default:
      console.log('weird action', action.type);
      return;
  }
}

io.on('connection', function(socket) {
  console.log('user connected: ' + socket.id);

  sendComponentsData(socket);

  socket.on('action', (action) => {
    actionHandler(socket, action);
    sendComponentsData(socket);
  });

  socket.on('disconnect', () => { console.log('user disconnected'); });
});
