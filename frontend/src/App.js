import React, { Component } from 'react';
import './App.css';
import PreferencesModal from './Components/Modal/PreferencesModal.js'
import Home from './Components/HomeComponent/Home.js'
import queryString from 'query-string';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      addedPreferences: false,
      access_token: '',
      refresh_token: ''
    }
    
    this.finishAddingPreferences = () => {
      this.setState({
        addedPreferences: true,
      })
    } 
    
    this.refreshToken = () => {
      const spotifyTokenObj = JSON.parse(window.localStorage.getItem('spotify_token'));
      const timestamp = new Date();
      const diff = timestamp - new Date(spotifyTokenObj.timestamp);
      console.log(`Time diff for refresh token ${diff}/${900*1000} needed for refresh`);
      if (diff < (900 * 1000)) { // sa nu isi faca refresh intruna, ci la minim 30 de minute. ei ziceau ca token-ul de acces ar expira dupa 60 de minute
        return;
      }
      const refreshURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/refresh_token?refresh_token=' + spotifyTokenObj.refresh_token;
      axios.get(refreshURL).then(response => {
        
        const { access_token } = response.data;
        spotifyTokenObj.timestamp = timestamp;
        spotifyTokenObj.access_token = access_token;
        window.localStorage.setItem('spotify_token', JSON.stringify(spotifyTokenObj));
        this.setState({
          access_token
        })
      });
    }
  }
  
  componentDidMount() {
    const spotifyTokenObj = JSON.parse(window.localStorage.getItem('spotify_token'));
    if(spotifyTokenObj) {
      this.refreshToken();
      this.setState({
        loggedIn: true,
        addedPreferences: true,
        refresh_token: spotifyTokenObj.refresh_token,
        access_token: spotifyTokenObj.access_token
      })
    } else {
      const parsedHash = queryString.parse(window.location.hash);
      const { access_token, refresh_token } = parsedHash;
      if (access_token && refresh_token) {
        this.setState({
          loggedIn: true,
          refresh_token,
          access_token
        })
      }
      
      window.location.hash = '';
    }
    
  }
  
  log() {
    const loginUrl = window.location.href.split('/').slice(0,-1).join('/') + ':8081/login';
    window.location.replace(loginUrl);
    
  }
  render() {
    return (
      <div>
        {!this.state.loggedIn && <button onClick={this.log}>Login with Spotify</button>}
        {this.state.loggedIn && !this.state.addedPreferences && 
          <PreferencesModal buttonLabel="Open" className="modal-class" 
            access_token={this.state.access_token} refresh_token={this.state.refresh_token} finishAddingPreferences={this.finishAddingPreferences} />}
        {this.state.loggedIn && this.state.addedPreferences && 
          <Home access_token={this.state.access_token} refresh_token={this.state.refresh_token} />}
      </div>
    );
  }
}

export default App;
