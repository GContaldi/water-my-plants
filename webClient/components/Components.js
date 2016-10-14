import React from 'react';
import Component from './Component';

const propTypes = {
  components: React.PropTypes.arrayOf(
    React.PropTypes.shape(Component.PropTypes)
  ).isRequired
};

class Components extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div>
        {
          this.props.components.map((component, index) => {
            return <Component {...component} key={index} />;
          })
        }
      </div>
    );
  }
}

export default Components;
