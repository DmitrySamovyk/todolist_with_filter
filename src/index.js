import './scss/main.scss';
import 'react-datetime/css/react-datetime.css';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Reducers/index';
import { loadState, saveState } from './state/localStorage';
import App from './Components/App';


const defaultState = loadState();
const Store = createStore(
  reducers,
  defaultState
);
const rootElement = document.getElementById('root');

Store.subscribe(() => {
  saveState(Store.getState());
});

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  rootElement
);