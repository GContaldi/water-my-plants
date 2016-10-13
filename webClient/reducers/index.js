import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import instantReads from './instantReads';

const reducer = combineReducers({
  instantReads,
  routing: routerReducer
});

export default reducer;
