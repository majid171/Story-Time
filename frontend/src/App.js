import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Register from './Components/register';
import Authors from './Components/authors';
import Profile from './Components/profile';
import PageNotFound from './Components/PageNotFound';
import * as Constants from './constants.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    const url = Constants.backendURL + '/auth/is-verify';
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include'
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to='/' />)} />
        <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
        <Route exact path="/" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
        <Route exact path="/u/users" render={props => isAuthenticated ? (<Authors {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
        <Route exact path="/u/:id" render={props => isAuthenticated ? (<Profile {...props} setAuth={setAuth}/>) : <Redirect to='/login' />} />
        <Route path="*" render={props => <PageNotFound {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
