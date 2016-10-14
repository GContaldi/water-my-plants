import _ from 'underscore';
import History from '../components/History';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const data = _.filter(state.history, (component) => {
    return component.param === 'humidity' && component.blockId === '1';
  });

  return {
    config: {
      rangeSelector: { selected: 1 },
      title: { text: 'Block 1' },
      series: [{
        name: 'Humidity sensor',
        data: data,
        tooltip: { valueDecimals: 2 }
      }]
    }
  };
};

export default connect(mapStateToProps)(History);
