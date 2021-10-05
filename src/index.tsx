import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { USE_MOCK_DATA } from './constants';
import { interceptRequestsOnMock } from './services/mock-interceptors';
require('iframe-resizer');

if (USE_MOCK_DATA) {
  interceptRequestsOnMock();
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
