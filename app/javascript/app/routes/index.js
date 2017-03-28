import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

// components
import Landing from '../components/landing/';

export default (
  <Router>
    <Route exac path="/" component={Landing} />
  </Router>
)