import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'app/containers/app';
import AboutPage from 'app/containers/about-page';
import ItemListPage from 'app/containers/item-list-page';
import OrderPage from 'app/containers/order-page';
import SettingsPage from 'app/containers/settings-page';
import ScanPage from 'app/containers/scan-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ ItemListPage }/>
    <Route path="/orders/:id" component={ OrderPage } />
    // <Route path="about" component={ AboutPage }/>
    <Route path="settings" component={ SettingsPage }/>
    // <Route path="scan" component={ ScanPage }/>
  </Route>
);
