import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import session from './session';
import error from './error';

const rootReducer = combineReducers({
  session,
  counter,
  error,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
