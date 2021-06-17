import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './bootstrap.min.css';
import AppContext from './context/AppContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <AppContext>
        <App />
    </AppContext>,
    document.getElementById('root')
);

reportWebVitals();
