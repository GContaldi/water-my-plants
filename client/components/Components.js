import React, { PropTypes } from 'react';
import Component from './Component';

const propTypes = {
  components: React.PropTypes.arrayOf(
    React.PropTypes.shape(Component.PropTypes)
  ).isRequired,
  componentsType: PropTypes.string.isRequired
};

class Components extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div>
        <h1>{ this.props.componentsType }</h1>
        <div>
          {
            this.props.components.map((component, index) => {
              return <Component {...component} key={index} />;
            })
          }
        </div>
      </div>
    )
  }
}

export default Components;
