import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Import Firebase app module
import 'firebase/compat/auth'; // Import Firebase authentication module
  
const GoogleAuthComponent = () => {
const [user, setUser] = useState(null);

const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
    const result = await firebase.auth().signInWithPopup(provider);
    setUser(result.user);
    console.log(result)
    console.log(result.user)
    } catch (error) {
    console.error(error.message);
    }
};

const signOut = async () => {
    try {
    await firebase.auth().signOut();
    setUser(null);
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
