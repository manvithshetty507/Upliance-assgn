import React, { useEffect, useState } from 'react';
import JoditEditor from "jodit-react";
import './profile.css'
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
const Profile = () => {
    const [user] = useAuthState(auth)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
      });
    
      const navigate = useNavigate();
      const [isFormDirty, setIsFormDirty] = useState(false);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsFormDirty(true);
      };
    
      useEffect(() => {
        const handleWindowClose = (e) => {
          if (isFormDirty) {
            e.preventDefault();
            e.returnValue = ''; // For Chrome
            return ''; // For Firefox
          }
        };
    
        window.addEventListener('beforeunload', handleWindowClose);
    
        return () => {
          window.removeEventListener('beforeunload', handleWindowClose);
        };
      }, [isFormDirty]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsFormDirty(false);
    
        // Generate a unique user ID
        const userId = Math.random().toString(36).substring(7); // Example of generating random user ID
    
        // Combine user ID with form data
        const userData = {
          userId,
          ...formData,
        };
    
        // Save user data to local storage
        window.localStorage.setItem('userData', JSON.stringify(userData));
        alert('saved')
        // Navigate to the counter page or any other destination
        navigate('/counter');
      };
    
      const handleLeavePage = () => {
        if (isFormDirty && window.confirm('Are you sure you want to leave? Your changes may not be saved.')) {
          setIsFormDirty(false);
          navigate(-1);
        }
      };

      useEffect(() => {
        if(!user) {
            navigate('/')
        }
      },[user])

  return (
    <div className="profile-container">
      <h2 className="form-title">User Data Form</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label className="form-label">
          Address:
          <input className="form-input" type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label className="form-label">
          Email:
          <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label className="form-label">
          Phone:
          <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <button className="submit-button" type="submit">Submit</button>
      </form>

      <h2 className="editor-title">Rich Text Editor</h2>
      <JoditEditor
        className="editor"
        onChange={(content) => {
            // Handle content change
        }}
        value={''} // Pass user data here
        config={{
            minHeight: 400, // Set the minimum height of the editor
            showCharsCounter: false, // Hide the character counter
            toolbarAdaptive: false, // Disable adaptive toolbar
            toolbarButtonSize: 'large', // Set button size to large
            buttons: [
            'bold',
            'italic',
            'underline',
            '|',
            'ul',
            'ol',
            '|',
            'font',
            'fontsize',
            '|',
            'align',
            'undo',
            'redo',
            ], // Specify the toolbar buttons you want to display
        }}
        />
    </div>
  );
};

export default Profile;
