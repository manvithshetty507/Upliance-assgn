import React, { useEffect, useState } from 'react';
import Login from '../components/loginSignup/login'
import SignUp from '../components/loginSignup/signup'
import './styles.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
        navigate('/counter')
    }
  },[user])

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container">
        <div className="form-container">
        {showLogin ? <Login /> : <SignUp />}
        <button className="button" onClick={toggleForm}>
            {showLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
        </div>
    </div>
  );
}

export default LandingPage;
