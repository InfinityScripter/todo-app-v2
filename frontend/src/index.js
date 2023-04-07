import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    Font-family: Consolas, monospace;
  }
`
const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (

  <>
    <GlobalStyle />
    <App />
  </>

);

