import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase'; // Assuming you have your Firebase auth instance exported

function Header() {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    auth.signOut();
  };


  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/counter" className="nav-link">Counter</Link>
          </li>
          <li className="nav-item">
            <Link to="/stats" className="nav-link">Stats</Link>
          </li>
          {user && (
            <li className="nav-item">
              <button onClick={handleSignOut} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
