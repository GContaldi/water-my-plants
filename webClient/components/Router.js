import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import CurrentStatus from './CurrentStatus';
import History from './History';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={CurrentStatus} />
            <Route path="history" component={History} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default AppRouter;
