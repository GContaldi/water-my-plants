export const pumpAction = (action) => {
  return {
    type: 'server/COMMAND',
    data: { object: 'pump', value: action }
  };
};
