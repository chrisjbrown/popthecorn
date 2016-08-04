require('./manifest.json');

import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from 'base/store/routes';
import configureStore from 'base/store/configure-store';

import 'base/styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

if ('serviceWorker' in navigator) {
  const register = require('serviceworker!./sw.js');
  register({ scope: '/' });
} else {
  console.warn('Service workers aren\'t supported in this browser.');
}

if (!__TEST__) {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <Router history={ history }>
          { routes }
        </Router>
      </Provider>
    </div>,
    document.getElementById('root')
  );
}
