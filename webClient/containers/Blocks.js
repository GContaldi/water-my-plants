import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import Block from '../components/Block';

const propTypes = {
  blocks: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    blocks: _.groupBy(state.instantReads, (component) => component.groupId)
  };
};

class Blocks extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    debugger;
    return (
      <div>
        {
          _.reduce(this.props.blocks, (blocks, components, blockId) => {
            blocks.push(<Block components={components} blockId={blockId} key={blockId} />)
            return blocks;
          }, [])
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Blocks);
