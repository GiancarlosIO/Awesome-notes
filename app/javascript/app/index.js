import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// components
import Landing from './landing/';
// reducers

// store

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Landing />
    , document.getElementById('app-container')
  )
})