export const pumpAction = (blockId, value) => {
  return {
    type: 'server/COMMAND',
    data: {
      blockId,
      param: 'pump',
      value: value === 'on' ? 1 : 0
    }
  };
};
