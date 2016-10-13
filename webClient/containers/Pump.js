import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pumpAction } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired
};

class Pump extends React.Component {
  static get propTypes() { return propTypes; }

  handleClick() {
    this.props.dispatch(pumpAction(this.props.action));
  }

  render() {
    const onButtonClick = this.handleClick.bind(this);

    return (
      <div>
        <button onClick={onButtonClick}>
          {`Turn pump ${this.props.action}`}
        </button>
      </div>
    );
  }
}

export default connect()(Pump);
