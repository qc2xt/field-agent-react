import FieldAgent from './components/FieldAgent';
import NavBar from './components/NavBar';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

//router stuff

function App() {
  const [user, setUser] = useState(null);

  /* const authenticate = async (username, password) => {
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
      // do something with token
    } else if (response.status === 403) {
      throw new Error('Bad username or password');
    }
  }*/

  return (
    <div className="App">
      <Router> 
        <ul>
          <li>
            <Link to="/agents">Field Agent Main</Link>
          </li>
        </ul>


        <Switch>
          <Route exact path="/">
            {/*Home */}
          </Route>
          <Route exact path="/agents">
            <FieldAgent />
          </Route>
          <Route exact path="/agents/add">
            {/*add page */}
          </Route>
          <Route exact path="/agents/edit/:id">
            {/*update page */}
          </Route>
          <Route exact path="/login">
            {/*login page */}
          </Route>
          <Route exact path="/register">
            {/*register */}
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
