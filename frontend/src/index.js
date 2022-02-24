import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import axios from 'axios';
import App from './App';

axios.defaults.baseURL = process.env.API_URL;

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root'),
);
