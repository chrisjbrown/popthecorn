import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'app/containers/app';
import DiscoverPage from 'app/containers/discover-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute name="discover" component={ DiscoverPage } />
  </Route>
);
