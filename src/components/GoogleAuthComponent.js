// GoogleAuthComponent.js
import React, { useContext } from "react";
import firebase from "firebase/compat/app"; // Import Firebase app module
import "firebase/compat/auth"; // Import Firebase authentication module
import { UserContext } from "./MainProvider";

const GoogleAuthComponent = () => {
  const { user, updateUser } = useContext(UserContext); // Access user context

  const createUser = async (userData) => {
    console.log("GoogleAuthComponent -> ", userData);
    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data); // Assuming backend returns user ID in the response
      return data.userId; // Access the user ID from the response
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log("result.user: ", result.user);
      const { displayName, email } = result.user;
      const userData = {
        username: displayName,
        email: email,
        password: "",
      };
      const userId = await createUser(userData);
      console.log("user id: ", userId);
      const userObject = {
        name: result.user.displayName,
        email: result.user.email,
        userId: userId,
      };
      updateUser(userObject); // Update user context with the obtained user data
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
          <p>Welcome, {user.name}!</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleAuthComponent;
