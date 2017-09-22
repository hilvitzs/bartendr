import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './offcanvas.css';

// Get any server-provided data from the page
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

