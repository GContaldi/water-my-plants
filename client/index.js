import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

store.subscribe(() => {
  console.log('new state', JSON.stringify(store.getState()));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
