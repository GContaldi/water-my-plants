import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { turnPumpOn } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class TurnPumpOn extends React.Component {
  static get propTypes() { return propTypes; }

  handleClick() {
    this.props.dispatch(turnPumpOn());
  }

  render() {
    const onButtonClick = this.handleClick.bind(this);

    return (
      <div>
        <button onClick={onButtonClick}>
          Turn Pump On
        </button>
      </div>
    );
  }
}

export default connect()(TurnPumpOn);
