import React from 'react';
import Pump from '../containers/Pump';

class App extends React.Component {
  render() {
    return (
      <div>
        <Pump action="on" />
        <Pump action="off" />
      </div>
    );
  }
}

export default App;
