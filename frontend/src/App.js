import React, {Fragment, useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Register from './Components/register';

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props}/>) : (<Redirect to='/dashboard' />)}/>
            <Route exact path="/register" render={props => <Register {...props}/>}/>
            <Route exact path="/dashboard" render={props => <Dashboard {...props}/>}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
