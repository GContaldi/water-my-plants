import _ from 'underscore';

const isSameComponent = (component1, component2) => {
  return component1.blockId === component2.blockId &&
    component1.param === component2.param;
};

const isComponentPresent = (components = [], data) => {
  return _.some(components, (component) => isSameComponent(component, data));
};

const addComponent = (components = [], newComponent) => {
  return [
    ...components,
    newComponent
  ];
};

const updateComponent = (component = {}, data) => {
  if (isSameComponent(component, data)) {
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
