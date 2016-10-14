import socketIO from 'socket.io';
import _ from 'underscore';
import { http } from './express';
import mqttClient from './mqttClient';
// import mongoClient from './mongoClient';
import { socketToMqtt, mqttToSocket, decodeMessage } from './lib/eventsTranslator';

export const io = socketIO(http);

io.on('connection', function(socket) {
  console.log('SocketIO client connected with id: ' + socket.id);

  socket.on('action', (action) => {
    console.log('SocketIO action received from: ' + socket.id, action);

    // TODO: save in db
    // mongoClient.insertDocuments().then(
    //   (result) => console.log('MongoDB - Action saved in DB', result),
    //   (reason) => console.log('MongoDB - Action could not be saved', reason);
    // );

    const [topic, payload] = socketToMqtt(action);
    mqttClient.publish(topic, payload);
  });

  socket.on('disconnect', () => {
    console.log('SocketIO client disconnected with id: ' + socket.id);
  });

  mqttClient.on('message', function(topic, message) {
    console.log('MQTT client message received:', topic, decodeMessage(message));

    // TODO: save in db
    // mongoClient.insertDocuments().then(
    //   (result) => console.log('MongoDB - Action saved in DB', result),
    //   (reason) => console.log('MongoDB - Action could not be saved', reason);
    // );

    const action = mqttToSocket(topic, message);
    socket.emit('action', action);
  });
});
