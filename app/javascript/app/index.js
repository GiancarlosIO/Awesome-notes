import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Routes
import Routes from './routes/';

// reducers
import storeConfig from './store/';

// store
const storeWithMiddleware = applyMiddleware()(createStore);
const store = storeWithMiddleware(storeConfig);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      { Routes }
    </Provider>
    , document.getElementById('app-container')
  )
})