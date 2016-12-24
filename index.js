import React from 'react';
import { render } from 'react-dom';
import App from './js/app';
import Login from './js/login';
import { Router, Route, hashHistory } from 'react-router';

render(
  (
    <Router history={hashHistory}>
     <Route path='/' component={App} />
     <Route path='/login' component={Login} />
   </Router>
  ),
   document.getElementById('app')
);
