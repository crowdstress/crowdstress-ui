import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from '@/router';
import { configureStore } from '@/store/configureStore';
import '@/styles/main.scss';
import '@/styles/icons.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app') as HTMLElement
);
