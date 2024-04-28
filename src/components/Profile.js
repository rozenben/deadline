import React, { useState } from "react";

// Profile Information Display Component
const ProfileInfo = ({ userProfile }) => {
  return (
    <div style={{ fontSize: 10 }}>
      <img
        src={userProfile.profilePicture}
        alt="Profile"
        style={{ width: "100px", height: "100px" }}
      />
      <br />
      <strong>{userProfile.name}</strong>
      <p>Email: {userProfile.email}</p>
      {/* Display other profile information */}
    </div>
  );
};

// Edit Profile Form Component
const EditProfileForm = ({ userProfile, onSave }) => {
  const [formData, setFormData] = useState(userProfile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* Add other input fields for editing profile */}
      <button type="submit">Save</button>
    </form>
  );
};

// Privacy Settings Component
const PrivacySettings = ({ userProfile }) => {
  const [showEmail, setShowEmail] = useState(userProfile.showEmail);

  const handleToggleEmail = () => {
    setShowEmail(!showEmail);
    // Update privacy settings on the backend
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showEmail}
          onChange={handleToggleEmail}
        />
        Show Email to Connections
      </label>
      {/* Add other privacy settings options */}
    </div>
  );
};

// Delete Account Option Component
const DeleteAccount = ({ onDelete }) => {
  const handleDelete = () => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      onDelete();
    }
  };

  return <button onClick={handleDelete}>Delete Account</button>;
};

// Profile Component
const Profile = ({ userProfile, onUpdateProfile, onDeleteAccount }) => {
  return (
    <div>
      <h4>Profile:</h4>
      <ProfileInfo userProfile={userProfile} />
      <hr />
      {/* <h2>Edit Profile</h2>
      <EditProfileForm userProfile={userProfile} onSave={onUpdateProfile} />
      <hr />
      <h2>Privacy Settings</h2>
      <PrivacySettings userProfile={userProfile} />
      <hr />
      <DeleteAccount onDelete={onDeleteAccount} /> */}
    </div>
  );
};

export default Profile;
