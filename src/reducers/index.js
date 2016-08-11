import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import order from './order';
import orderList from './order-list';
import error from './error';

const rootReducer = combineReducers({
  session,
  order,
  orderList,
  error,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
