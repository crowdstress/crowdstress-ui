import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from '@/router';
import '@/styles/main.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app') as HTMLElement
);
