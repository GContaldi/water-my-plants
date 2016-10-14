import React from 'react';

const propTypes = {
  param: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired
};

class Component extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div data-key={this.props.key}>{`${this.props.param}: ${this.props.value}`}</div>
    );
  }
}

export default Component;
