import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AUTH_USER } from './constants/';

// Routes
import Routes from './routes/';

// reducers
import storeConfig from './reducers/';

// Api
import * as AuthAPI from './utils/apis/auth-api';

// store
const storeWithMiddleware = applyMiddleware(
  ReduxThunk.withExtraArgument(AuthAPI)
)(createStore);
const store = storeWithMiddleware(storeConfig);

// validate Session
const token = localStorage.getItem('access-token');
if (token) { store.dispatch({ type: AUTH_USER }) };

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      { Routes }
    </Provider>
    , document.getElementById('app-container')
  )
})