// src/App.js

import React, { useState, useContext } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import Settings from "./components/Settings";

import firebase from "firebase/compat/app"; // Import Firebase app module
import "firebase/compat/auth"; // Import Firebase authentication module
import GoogleAuthComponent from "./components/GoogleAuthComponent";
import { MainProvider } from "./components/MainProvider";

import "@fortawesome/fontawesome-free/css/all.css";

const firebaseConfig = {
  apiKey: "AIzaSyBqlTYyg9FV5dntPFgDtZnvSKR9h_U7LoY",
  authDomain: "deadline-1a22b.firebaseapp.com",
  projectId: "deadline-1a22b",
  storageBucket: "deadline-1a22b.appspot.com",
  messagingSenderId: "670413610548",
  appId: "1:670413610548:web:576fed05e3e1be1e6fb461",
  measurementId: "G-RWX4G13K8J",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  console.log("user: ", user);
  return (
    <MainProvider user={user} updateUser={setUser}>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#efdba8", color: "#1c76ff" }}
      >
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>Deadline</h1>
                <h4>Community of Tasks</h4>
              </div>
              <button
                className="btn btn-outline-secondary"
                onClick={toggleSettings}
              >
                <i className="fas fa-cog"></i> {/* Font Awesome setting icon */}
              </button>
            </div>
            {user && <Tabs />}
          </div>
          <Settings
            isOpen={isSettingsOpen}
            onClose={toggleSettings}
            user={user}
          />
          <GoogleAuthComponent />
        </div>
      </div>
    </MainProvider>
  );
}

export default App;
