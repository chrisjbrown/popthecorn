import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import order from './order';
import itemList from './item-list';
import item from './item';
import error from './error';

const rootReducer = combineReducers({
  session,
  order,
  itemList,
  item,
  error,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
