import React, {Fragment, useState, useEffect} from 'react';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Register from './Components/register';
import * as Constants from './constants.js';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean);
  }

  const isAuth = async() =>{
    const url = Constants.backendURL + '/auth/is-verify';
    try{
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include'
      });
      
      const parseRes = await response.json();

      parseRes === true? setIsAuthenticated(true): setIsAuthenticated(false);

    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(() =>{
    isAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/>) : (<Redirect to='/dashboard' />)}/>
            <Route exact path="/register" render={props => !isAuthenticated? (<Register {...props} setAuth={setAuth}/>): (<Redirect to='/' />)}/>
            <Route exact path="/dashboard" render={props => isAuthenticated? (<Dashboard {...props} setAuth={setAuth}/>): (<Redirect to='/'/>)}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
