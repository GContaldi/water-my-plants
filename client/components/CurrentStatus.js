import React from 'react';
import FilteredComponents from '../containers/FilteredComponents';
import Pump from '../containers/Pump';

class CurrentStatus extends React.Component {
  render() {
    return (
      <div>
        <FilteredComponents componentsType="actuator" />
        <Pump action="on" />
        <Pump action="off" />
      </div>
    );
  }
}

export default CurrentStatus;
