import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
