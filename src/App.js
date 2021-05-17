import FieldAgent from './components/FieldAgent';
import AgentList from './components/AgentList';
import NavBar from './components/NavBar';
import Login from './components/Login';
import UpdateAgent from './components/UpdateAgent';
import AddAgent from './components/AddAgent';
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
    const { id, sub: username, roles: rString } = jwt_decode(token);
    const roles = rString.split(',');

    const user = {
      id,
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/agents">Add Agents</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>


          <Switch>
            <Route exact path="/">
              {user ? (
                <AgentList />
              ) : (
                <Redirect to="/login" />
              )}
              
            </Route>
            <Route exact path="/agents/add">
              {user ? (
                <FieldAgent />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/agents/edit/:id">
              {user ? (
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
