import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Landing from '../components/landing/';
import NoFound from '../components/public-pages/no-found';
import SignUp from '../components/authentication/signup';
import SignIn from '../components/authentication/signin';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route component={NoFound} />
    </Switch>
  </Router>
)