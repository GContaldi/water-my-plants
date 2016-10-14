import _ from 'underscore';

const history = (components = [], action) => {
  switch (action.type) {
    case 'NEW_READ':
      return [
        ...components,
        Object.assign({}, action.data, { date: Date.now() })
      ];

    default:
      return components;
  }
};

export default history;
