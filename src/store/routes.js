import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'app/containers/app';
import SearchPage from 'app/containers/search-page';

import ItemPage from 'app/containers/item-page';
import OrderListPage from 'app/containers/order-list-page';
import OrderPage from 'app/containers/order-page';
import SettingsPage from 'app/containers/settings-page';
import ScanPage from 'app/containers/scan-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute name="klantaanvragen" component={ OrderListPage }/>
    <Route name="order" path="/pickingorders/:orderId" component={ OrderPage } />
    <Route name="item" path="/pickingorders/:orderId/items/:itemId" component={ ItemPage } />
    <Route path="search" component={ SearchPage }/>
    <Route path="settings" component={ SettingsPage }/>
    // <Route path="scan" component={ ScanPage }/>
  </Route>
);
