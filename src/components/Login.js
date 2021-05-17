import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
import Errors from './Errors';

function Login() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const history = useHistory();
  const location = useLocation();

  const { state: { from } = { from : '/' } } = location;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.authenticate(username, password);
      history.push(from);
    } catch (err) {
      setErrors([err.message]);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <Errors errors={errors} />
      <form onSubmit={handleSubmit}>
      <div>
          <label>Username:</label>
          <input type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <button className="btn btn-primary ml-2" type="submit">Login</button>
          <Link className="btn btn-secondary ml-2" to={from}>Cancel</Link>
          <Link className="btn btn-warning ml-2" to="/register">I don't have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;