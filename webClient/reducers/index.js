import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import instantReads from './instantReads';
import history from './history';

const reducer = combineReducers({
  instantReads,
  history,
  routing: routerReducer
});

export default reducer;
