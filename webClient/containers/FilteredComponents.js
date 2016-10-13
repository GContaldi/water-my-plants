import { connect } from 'react-redux';
import Components from '../components/Components';

const mapStateToProps = (state, ownProps) => {
  return {
    components: state.instantReads.filter((component) => {
      return component.type === ownProps.componentsType;
    }),
    componentsType: ownProps.componentsType
  };
};

export default connect(mapStateToProps)(Components);
