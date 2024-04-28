// src/components/Settings.js

import React, { useState, useContext } from "react";
import "./Settings.css";
import Profile from "./Profile";
import LanguageSelector from "./LanguageSelector";
import { UserContext } from "./MainProvider";

const Settings = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    name: user ? user.name : "",
    profilePicture: user ? user.picture : "",
    email: user ? user.email : "",
    showEmail: user ? false : "",
  });

  // Function to update profile information
  const updateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // Send updated profile to the backend for saving
  };

  // Function to delete user account
  const deleteAccount = () => {
    // Delete user account logic
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "he", name: "Hebrew" },
    // Add more languages as needed
  ];

  const handleLanguageChange = (selectedLanguage) => {
    // Handle language change here (e.g., update language state)
    console.log("Selected language:", selectedLanguage);
  };

  const defaultLanguage = "he";

  return (
    <div
      className={`settings ${isOpen ? "open" : ""}`}
      style={{ backgroundColor: "#fddea8" }}
    >
      <div className="settings-header">
        <h2>Setting</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="settings-content">
        <Profile
          userProfile={userProfile}
          // onUpdateProfile={updateProfile}
          // onDeleteAccount={deleteAccount}
        />
        <div>
          <LanguageSelector
            languages={languages}
            defaultLanguage={defaultLanguage}
            onSelectLanguage={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
