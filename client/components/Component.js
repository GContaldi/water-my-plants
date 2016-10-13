import React from 'react';

const propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
};

class Component extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div data-key={this.props.key}>{`${this.props.name}: ${this.props.value}`}</div>
    );
  }
}

export default Component;
