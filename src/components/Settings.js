// src/components/Settings.js

import React from 'react';
import './Settings.css';

const Settings = ({ isOpen, onClose }) => {
  return (
    <div className={`settings ${isOpen ? 'open' : ''}`} style={{backgroundColor: '#fddea8'}}>
      <div className="settings-header">
        <h2>Setting</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="settings-content">
        {/* Add your settings content here */}
        <p>This is the settings content.</p>
      </div>
    </div>
  );
};

export default Settings;
