export const pumpAction = (action) => {
  return {
    type: 'server/COMMAND',
    data: {
      name: 'pump',
      type: 'actuator',
      value: action
    }
  };
};
