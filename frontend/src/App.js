import React, { Fragment, useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Register from './Components/register';
import Authors from './Components/authors';
import Profile from './Components/profile';
import Testing from './Components/testing';
import PageNotFound from './Components/PageNotFound';
import * as Constants from './constants.js';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState("");

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

  const getUser = async () => {
    try {
      const url = Constants.backendURL + '/dashboard';
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });

      const parseRes = await res.json();
      setUserID(parseRes.user_id);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
    getUser();

  }, []);

  return (
    <Fragment>
      <Router>
        {/* <div className="container"> */}
        <Switch>
          <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to='/' />)} />
          <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
          <Route exact path="/" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
          <Route exact path="/u/users" render={props => isAuthenticated ? (<Authors {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
          {/* <Route exact path="/u/users" render={props => <Authors {...props} setAuth={setAuth} />} /> */}
          <Route exact path="/u/profile" render={props => isAuthenticated ? (<Profile {...props} setAuth={setAuth} userID={userID} />) : <Redirect to='/login' />} />
          <Route exact path="/u/:id" render={props => isAuthenticated ? (<Testing {...props} setAuth={setAuth} />) : <Redirect to='/login' />} />
          {/* <Route exact path="/u/users" render={props => <Authors {...props} setAuth={setAuth} />} /> */}

          <Route path="*" render={props => <PageNotFound {...props} />} />
        </Switch>
        {/* </div> */}
      </Router>
    </Fragment>
  );
}

export default App;
