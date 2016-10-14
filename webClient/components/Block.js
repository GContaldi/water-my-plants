import React from 'react';
import Pump from '../containers/Pump';
import Components from './Components';

const propTypes = {
  blockId: React.PropTypes.number.isRequired,
  components: React.PropTypes.shape(Components.PropTypes).isRequired
};

class Block extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div>
        <Components components={this.props.components} />
        <Pump action="on" blockId={this.props.blockId} />
        <Pump action="off" blockId={this.props.blockId} />
      </div>
    );
  }
}

export default Block;
