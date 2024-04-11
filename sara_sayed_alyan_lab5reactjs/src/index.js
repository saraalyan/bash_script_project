import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import {Provider} from'react-redux';
import my_store from './store/store.js';
ReactDOM.render(
 <Provider store={my_store}>

      <App />
  
      </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
