import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'base/containers/app';
import AboutPage from 'base/containers/about-page';
import CounterPage from 'base/containers/counter-page';
import PickListPage from 'base/containers/pick-list-page';
import SettingsPage from 'base/containers/settings-page';
import ScanPage from 'base/containers/scan-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ CounterPage }/>
    <Route path="about" component={ AboutPage }/>
    <Route path="picklist" component={ PickListPage }/>
    <Route path="settings" component={ SettingsPage }/>
    <Route path="scan" component={ ScanPage }/>
  </Route>
);
