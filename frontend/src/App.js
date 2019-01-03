import React, { Component } from 'react';
import './App.css';
import PreferencesModal from './Components/Modal/PreferencesModal.js'

class App extends Component {
  render() {
    return (
      <PreferencesModal buttonLabel="Open" className="test-class"/>
    );
  }
}

export default App;
