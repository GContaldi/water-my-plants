import socketIO from 'socket.io';
import _ from 'underscore';
import { http } from './express';
import mqttClient, { MQTT_TOPICS } from './mqttClient';
import { socketToMqtt, mqttToSocket } from './lib/eventsTranslator';

export const io = socketIO(http);

io.on('connection', function(socket) {
  console.log('WebClient connected to SocketIO with id: ' + socket.id);

  socket.on('action', (action) => {
    console.log('SocketIO: ' + socket.id);
    // TODO: save in db
    const [topic, payload] = socketToMqtt(action);
    mqttClient.publish(topic, payload);
  });

  socket.on('disconnect', () => {
    console.log('socket: user disconnected');
    mqttClient.unsubscribe(MQTT_TOPICS);
    console.log('mqtt client disconnected');
  });

  mqttClient.on('message', function(topic, message) {
    // TODO: save in db
    const action = mqttToSocket(topic, message);
    socket.emit('action', action);
  });
});
