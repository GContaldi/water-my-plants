import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Components from '../components/Components'

const propTypes = {
  componentsType: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    components: state.instantReads.filter((component) => {
      return component.type === ownProps.componentsType;
    }),
    componentsType: ownProps.componentsType
  }
}

export default connect(mapStateToProps)(Components);
