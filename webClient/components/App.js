import React from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: React.PropTypes.element.isRequired
};

class App extends React.Component {
  static get propTypes() { return propTypes; }

  render() {
    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Current Status</Link>
          {' '}
          <Link to="/history">History</Link>
        </header>
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
      </div>
    );
  }
}

export default App;
