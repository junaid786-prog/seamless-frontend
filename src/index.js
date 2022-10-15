import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from "react-redux"
import Store from './Redux/Store';

import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={Store}>
        <App />
      </Provider>
      </AlertProvider>
    </Router> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
