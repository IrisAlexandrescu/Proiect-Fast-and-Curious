import React, { Component } from 'react';
import './App.css';
import PreferencesModal from './Components/Modal/PreferencesModal.js'
import Home from './Components/HomeComponent/Home.js'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;

// <PreferencesModal buttonLabel="Open" className="test-class"/>