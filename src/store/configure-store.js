import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import logger from './logger';
import rootReducer from 'base/reducers';
import initSagas from 'base/sagas';

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  let middlewares = [
    sagaMiddleware,
    routerMiddleware(browserHistory),
  ];

  if (__DEV__) {
    middlewares = [...middlewares, logger];
  }

  const store = compose(
    applyMiddleware(...middlewares),
    ..._getEnhancers()
  )(createStore)(rootReducer, initialState);

  sagaMiddleware.run(initSagas);

  _enableHotLoader(store);
  return store;
}

function _getEnhancers() {
  let enhancers = [
    persistState('session', _getStorageConfig()),
  ];

  if (__DEV__ && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension()];
  }

  return enhancers;
}

function _enableHotLoader(store) {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

function _getStorageConfig() {
  return {
    key: 'stockrunner',
    serialize: (store) => {
      return store && store.session ?
        JSON.stringify(store.session.toJS()) : store;
    },
    deserialize: (state) => ({
      session: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  };
}

export default configureStore;
