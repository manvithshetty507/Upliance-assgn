import React, { useEffect, useState } from 'react';
import './counter.css'; 
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';


function Counter() {
  const [count, setCount] = useState(0);
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
        navigate('/')
    }
  },[user])

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <div className="background" style={{ height: `${count * 10}px` }}></div>
      <div className="counter">
        <h2>Counter: {count}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
