import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store"
import axios from 'axios';
import dotenv from 'dotenv';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
dotenv.config();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);


reportWebVitals();
