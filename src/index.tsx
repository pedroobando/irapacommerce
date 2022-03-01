import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { AppCommerce } from './AppCommerce';
import reportWebVitals from './reportWebVitals';

const elementId = document.getElementById('root');
render(
  <React.StrictMode>
    <AppCommerce />
  </React.StrictMode>,
  elementId,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
