import React, { Component } from 'react';
import './App.css';
import PreferencesModal from './Components/Modal/PreferencesModal.js'
import Home from './Components/HomeComponent/Home.js'
import queryString from 'query-string';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      addedPreferences: false,
      access_token: ''
    }
    
    this.finishAddingPreferences = () => {
      this.setState({
        addedPreferences: true,
      })
    }
  }
  
  componentDidMount() {
    const spotifyTokenObj = JSON.parse(window.localStorage.getItem('spotify_token'));
    if(spotifyTokenObj) {
      this.setState({
        loggedIn: true,
        addedPreferences: true,
        access_token: spotifyTokenObj.access_token
      })
    } else {
      const parsedHash = queryString.parse(window.location.hash);
      const { access_token, refresh_token } = parsedHash;
      console.log(parsedHash);
      if (access_token && refresh_token) {
        this.setState({
          loggedIn: true,
          
          access_token
        })
      }
      
      window.location.hash = '';
    }
  }
  
  log() {
    console.log(2);
    const loginUrl = window.location.href.split('/').slice(0,-1).join('/') + ':8081/login';
    console.log(loginUrl);
    window.location.replace(loginUrl);
    
  }
  render() {
    return (
      <div>
        {!this.state.loggedIn && <button onClick={this.log}>Login with spoify</button>}
        {this.state.loggedIn && !this.state.addedPreferences && 
          <PreferencesModal buttonLabel="Open" className="test-class" 
            access_token={this.state.access_token} finishAddingPreferences={this.finishAddingPreferences} />}
        {this.state.loggedIn && this.state.addedPreferences && <Home access_token={this.state.access_token} />}
      </div>
    );
  }
}

export default App;
