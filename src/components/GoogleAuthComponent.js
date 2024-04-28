// GoogleAuthComponent.js
import React, { useContext } from 'react';
import firebase from 'firebase/compat/app'; // Import Firebase app module
import 'firebase/compat/auth'; // Import Firebase authentication module
import { UserContext } from './MainProvider';

const GoogleAuthComponent = () => {
  const { user, updateUser } = useContext(UserContext); // Access user context

  const createUser = async (userData) => {
    console.log("GoogleAuthComponent -> ", userData)
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log(data.message); // Message from the backend
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log(result.user)
        console.log(updateUser)
        updateUser(result.user); // Update user context with the obtained user data
      const { displayName, email } = result.user;
      const userData = {
        username: displayName,
        email: email,
        password: '',
      };
      await createUser(userData);
      console.log("result: ", result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      updateUser(null); // Clear user data from the context
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleAuthComponent;
