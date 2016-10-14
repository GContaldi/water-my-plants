import React from 'react';
import ReactHighcharts from 'react-highcharts';

const propTypes = {
  config: React.PropTypes.object.isRequired
};

class History extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div>
        <h1>History</h1>
        <div>
          <ReactHighcharts config = {this.props.config} />
        </div>
      </div>
    );
  }
}

export default History;
