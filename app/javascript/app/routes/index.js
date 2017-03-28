import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Landing from '../components/landing/';
import NoFound from '../components/public-pages/no-found';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={NoFound} />
    </Switch>
  </Router>
)