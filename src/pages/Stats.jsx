import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase'; // Assuming you have a firebase.js file exporting your Firestore instance
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import './stats.css'

const Stats = () => {
  const [user] = useAuthState(auth)
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users')); // Use collection(db, 'users') to reference the 'users' collection
            const usersData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setUserData(usersData);
          } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchData();

    console.log(userData)
  }, []);

  // Calculate user count by login date
  const userCountByDate = userData.reduce((acc, user) => {
    const loginDate = user.createdAt.toDate().toDateString(); // Assuming loginDate is a Firebase timestamp field
    acc[loginDate] = (acc[loginDate] || 0) + 1;
    return acc;
  }, {});

  // Convert user count by date object to an array of objects for recharts
  const data = Object.keys(userCountByDate).map(date => ({
    date,
    users: userCountByDate[date]
  }));

  useEffect(() => {
    if(!user) {
        navigate('/')
    }
  },[user])

  return (
    <div className='stats-container'>
      <h2 className='stats-title'>User Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickCount={1} interval="preserveStartEnd" padding={{ top: 20, bottom: 20 , left:20, right: 20}}/> {/* Set tickCount to control the number of ticks */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Stats;
