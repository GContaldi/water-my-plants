export const turnPumpOn = () => {
  return {
    type: 'server/COMMAND',
    data: { object: 'pump', value: 'on' }
  };
};
