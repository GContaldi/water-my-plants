import _ from 'underscore';

const objectPresent = (state = [], data) => {
  return _.some(state, function(e) { return e.object === data.object; });
};

const addRead = (reads = [], newRead) => {
  return [
    ...reads,
    newRead
  ];
};

const updateRead = (state = {}, data) => {
  if (state.object !== data.object) {
    return state;
  }
  return data;
};

const updateReads = (state = [], data) => {
  return state.map((o) => updateRead(o, data));
};

const instantReads = (state = [], action) => {
  switch (action.type) {
    case 'NEW_READ':
      return objectPresent(state, action.data) ?
        updateReads(state, action.data) :
        addRead(state, action.data);

    default:
      return state;
  }
};

export default instantReads;
