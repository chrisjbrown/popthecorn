import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import error from './error';
import discover from './discover';
import genres from './genres';
import config from './config';

const rootReducer = combineReducers({
  error,
  routing: routerReducer,
  form: formReducer,
  config,
  discover,
  genres,
});

export default rootReducer;
