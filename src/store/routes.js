import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'base/containers/app';
import AboutPage from 'base/containers/about-page';
import CounterPage from 'base/containers/counter-page';
import OrderListPage from 'base/containers/order-list-page';
import OrderPage from 'base/containers/order-page';
import SettingsPage from 'base/containers/settings-page';
import ScanPage from 'base/containers/scan-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ OrderListPage }/>
    <Route path="/orders/:id" component={ OrderPage } />
    // <Route path="counter" component={ CounterPage }/>
    // <Route path="about" component={ AboutPage }/>
    <Route path="settings" component={ SettingsPage }/>
    // <Route path="scan" component={ ScanPage }/>
  </Route>
);
