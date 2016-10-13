import componentGenerator from '../../lib/componentGenerator';

export const pumpAction = (action) => {
  return {
    type: 'server/COMMAND',
    data: componentGenerator('pump', 'actuator', action)
  };
};
