import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Landing from '../components/landing/';
import NoFound from '../components/public-pages/no-found';
import SignUp from '../components/authentication/signup';
import SignIn from '../components/authentication/signin';
import Notes from '../components/notes/';

// hoc
import RequireAuth from '../components/hoc/require-auth';
import HideAuth from '../components/hoc/hide-auth';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={HideAuth(SignUp)} />
      <Route path="/signin" component={HideAuth(SignIn)} />
      <Route path="/notes" component={RequireAuth(Notes)} />
      <Route component={NoFound} />
    </Switch>
  </Router>
)