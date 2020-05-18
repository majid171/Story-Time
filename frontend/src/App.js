import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Register from './Components/register';
import Authors from './Components/authors';
import Profile from './Components/profile';
import PageNotFound from './Components/PageNotFound';
import * as Constants from './constants.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      loading: true
    }
  }

  setAuth = (boolean) => {
    this.setState({ isAuthenticated: boolean });
  }

  isAuth = async () => {
    const url = Constants.backendURL + '/auth/is-verify';
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include'
      });

      const parseRes = await response.json();
      this.setState({isAuthenticated: parseRes === true? true: false});
      this.setState({loading: false});
    } catch (err) {
      console.error(err.message);
    }
  }

  componentWillMount(){
    this.isAuth();
  }

  render() {
    if(this.state.loading){
      return(<div></div>);
    }
    else{
      return (
        <Router>
          <Switch>
            <Route exact path="/login" render={props => !this.state.isAuthenticated ? (<Login {...props} setAuth={this.setAuth} />) : (<Redirect to='/' />)} />
            <Route exact path="/register" render={props => !this.state.isAuthenticated ? (<Register {...props} setAuth={this.setAuth} />) : (<Redirect to='/login' />)} />
            <Route exact path="/" render={props => this.state.isAuthenticated ? (<Dashboard {...props} setAuth={this.setAuth} />) : (<Redirect to='/login' />)} />
            <Route exact path="/u/users" render={props => this.state.isAuthenticated ? (<Authors {...props} setAuth={this.setAuth} />) : (<Redirect to='/login' />)} />
            <Route exact path="/u/:id" render={props => this.state.isAuthenticated ? (<Profile {...props} setAuth={this.setAuth} />) : <Redirect to='/login' />} />
            <Route path="*" render={props => <PageNotFound {...props} />} />
          </Switch>
        </Router>
      );
    }
    
  }

  // return (
  //   <Router>
  //     <Switch>
  //       <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} isAuth={isAuthenticated} />) : (<Redirect to='/' />)} />
  // <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
  // <Route exact path="/" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
  // <Route exact path="/u/users" render={props => isAuthenticated ? (<Authors {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
  // <Route exact path="/u/:id" render={props => isAuthenticated ? (<Profile {...props} setAuth={setAuth} />) : <Redirect to='/login' />} />
  // <Route path="*" render={props => <PageNotFound {...props} />} />
  //     </Switch>
      /* <Switch>
        <Route exact path="/login" render={props => <Login {...props} setAuth={setAuth} />} />
        <Route exact path="/register" render={props => <Register {...props} setAuth={setAuth} />} />
        <Route exact path="/" render={props => <Dashboard {...props} setAuth={setAuth} />} />
        <Route exact path="/u/users" render={props => <Authors {...props} setAuth={setAuth} />} />
        <Route exact path="/u/:id" render={props => <Profile {...props} setAuth={setAuth} />} />
        <Route path="*" render={props => <PageNotFound {...props} />} />
      </Switch> */
    // </Router>
  // );
}

export default App;
