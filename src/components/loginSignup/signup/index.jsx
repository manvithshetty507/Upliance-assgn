import React, { useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import './styles.css'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Update import statement for useNavigate

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  const handleSignUp = async (e) => { // Remove email and password arguments
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Pass auth instance
      const user = userCredential.user;
  
      if (user) {
        // Create a new document in the 'users' collection with the user's uid as the document ID
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name,
          createdAt: serverTimestamp() 
          // Add additional user data here
        });
  
        // Redirect user to the counter page
        navigate('/counter');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="form" onSubmit={handleSignUp}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
