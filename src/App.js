import FieldAgent from './components/FieldAgent';
import DisplayAgents from './components/DisplayAgents';

import Login from './components/Login';
import UpdateAgent from './components/UpdateAgent';

import NotFound from './components/static/NotFound';
import Registration from './components/Registration';
import AuthContext from './components/AuthContext';
import Errors from './components/Errors';

import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const { id, sub: username, roles: rolesString } = jwt_decode(token);
    const roles = rolesString.split(',');

    const user = {
      id,
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      },
      isValid() {
        return true;
      }
    }

    setUser(user);
  }

  const authenticate = async (username, password) => {
    const response = await fetch('http://localhost:5000/authenticate', {
      method: 'POST',
      headers : {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status === 200) {
      const { jwt_token } = await response.json();
      login(jwt_token);
    } else if (response.status === 403) {
      throw new Error('Bad username or password');
    } else {
      throw new Error('There was a problem logging in...')
    }
  }

  const logout = () => {
    setUser(null);
  }

  const auth = {
    user,
    authenticate,
    logout
  }

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Router> 
          <ul id="nav">
            <li>
              <Link to="/" href="#">Home</Link>
            </li>
            <li>
              <Link to="/agents/add" href="#">Add Agents</Link>
            </li>
            <li>
              <Link to="/login" href="#">Login</Link>
            </li>
            <li>
              <Link to="/register" href="#">Register</Link>
            </li>
            <li>  
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </li>
            
          </ul>


          <Switch>
            <Route exact path="/">
              {(user && user.isValid()) ? (
                <DisplayAgents />
              ) : (
                <Redirect to="/login" />
              )}
              
            </Route>
            <Route exact path="/agents/add">
              {(user && user.isValid()) ? (
                <FieldAgent />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/agents/edit/:id">
              {(user && user.isValid()) ? (
                <UpdateAgent />
              ) : (
                <Redirect to="/login" />
              )}
              
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Registration />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
