import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { authUser, setUserData } from './actions/';
import { verifyExpiryAccessToken } from './utils/apis/header-config';

// Routes
import Routes from './routes/';

// reducers
import storeConfig from './reducers/';

// Api
import * as AuthAPI from './utils/apis/auth-api';

// configure redux extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store
// const storeWithMiddleware = applyMiddleware(
//   ReduxThunk.withExtraArgument(AuthAPI)
// )(createStore);
// const store = storeWithMiddleware(storeConfig);
const store = createStore(storeConfig, {}, composeEnhancers(
  applyMiddleware(ReduxThunk.withExtraArgument(AuthAPI))
));
window.store = store;
// validate Session
const session = localStorage.getItem('session');
if (session && verifyExpiryAccessToken()) {
  const userData = JSON.parse(localStorage.getItem('user'));
  store.dispatch(authUser());
  store.dispatch(setUserData(userData))
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      { Routes }
    </Provider>
    , document.getElementById('app-container')
  )
})