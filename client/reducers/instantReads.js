import _ from 'underscore';

const isComponentPresent = (components = [], data) => {
  return _.some(components, (component) => { return component.name === data.name; });
};

const addComponent = (components = [], newComponent) => {
  return [
    ...components,
    newComponent
  ];
};

const updateComponent = (component = {}, data) => {
  if (component.name === data.name) {
    return Object.assign({}, component, { value: data.value });
  }
  return component;
};

const updateComponents = (components = [], data) => {
  return components.map((component) => updateComponent(component, data));
};

const instantReads = (components = [], action) => {
  switch (action.type) {
    case 'NEW_READ':
      return isComponentPresent(components, action.data) ?
        updateComponents(components, action.data) :
        addComponent(components, action.data);

    default:
      return components;
  }
};

export default instantReads;
