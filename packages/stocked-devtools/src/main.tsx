import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './global.scss';

window.addEventListener('message', function (message) {
    console.log(message);
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
