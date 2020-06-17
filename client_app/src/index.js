import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import EventManager from './EventManager';

EventManager();

ReactDOM.render(<App />, document.getElementById('root'));