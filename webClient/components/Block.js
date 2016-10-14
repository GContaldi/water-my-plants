import React from 'react';
import Pump from '../containers/Pump';
import Component from './Component';

const propTypes = {
  blockId: React.PropTypes.string.isRequired,
  components: React.PropTypes.arrayOf(
    React.PropTypes.shape(Component.PropTypes)
  ).isRequired
};

class Block extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div data-key={this.props.blockId}>
        <h1>{ `Block ${this.props.blockId}` }</h1>
        <div>
          <div>
            {
              this.props.components.map((component, index) => {
                return <Component {...component} key={index} />;
              })
            }
          </div>
          <Pump action="on" blockId={this.props.blockId} />
          <Pump action="off" blockId={this.props.blockId} />
        </div>
      </div>
    );
  }
}

export default Block;
