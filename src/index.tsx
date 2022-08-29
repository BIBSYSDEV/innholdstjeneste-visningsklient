import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { USE_MOCK_DATA } from './constants';
import { interceptRequestsOnMock } from './services/mock-interceptors';

require('iframe-resizer');

if (USE_MOCK_DATA) {
  interceptRequestsOnMock();
}

ReactDOM.render(<App />, document.getElementById('root'));
