import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

export const MQTT_TOPICS = ['arduino/out'];
export default client;

client.on('connect', function() {
  console.log('MQTT client connected to MQTT broker');

  client.subscribe(MQTT_TOPICS);
  console.log('MQTT client subscribed to topics: ', ...MQTT_TOPICS);
});
