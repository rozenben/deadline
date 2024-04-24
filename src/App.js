// src/App.js

import React, { useState } from 'react';
import './App.css'
import Tabs from './components/Tabs';
import Settings from './components/Settings';
import '@fortawesome/fontawesome-free/css/all.css';


function App() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };


  return (
    <div className="container-fluid" style={{ backgroundColor: '#efdba8', color:'#1c76ff'}}>
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '20vh' }}>
              <h1 >Deadline</h1>
              <h4 >Community of Tasks</h4>
            </div>
            <button className="btn btn-outline-secondary" onClick={toggleSettings}>
              <i className="fas fa-cog"></i> {/* Font Awesome setting icon */}
            </button>
            </div>
          <Tabs />
        </div>
        <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
      </div>
    </div>
  );
}

export default App;
