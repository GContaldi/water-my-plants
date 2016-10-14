
const decodeMessage = (message) => {
  return JSON.parse(message.toString());
};

const encodeMessage = (message) => {
  return JSON.stringify(message);
};

const socketToMqttTranslator = {
  'server/COMMAND': (action) => {
    return [
      'arduino/in',
      encodeMessage(action.data)
    ];
  }
};

const mqttToSocketTranslator = {
  'arduino/out': (message) => {
    return {
      type: 'NEW_READ',
      data: decodeMessage(message)
    };
  }
};


export const socketToMqtt = (action) => {
  return socketToMqttTranslator[action.type](action);
};

export const mqttToSocket = (topic, message) => {
  return mqttToSocketTranslator[topic](message);
};
