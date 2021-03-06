import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './view/layouts/App';
import './index.css';
import { fetchNodes } from './state/nodes/nodesSlice';
import store from './state/store';
import { fetchVariables } from './state/variables/variablesSlice';

store.dispatch(fetchVariables());
store.dispatch(fetchNodes());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
