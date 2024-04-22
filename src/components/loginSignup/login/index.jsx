import React, { useState } from 'react';
import { auth } from '../../../firebase/firebase'; // Import Firebase authentication module
import './styles.css'
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login")
    try {
      // Sign in the user with email and password
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("login",user)
      if(user) {
        navigate('/counter')
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
