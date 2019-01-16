import React from 'react';
import SideNavbar from './SideNavbar';
import WeatherWidget from './WeatherWidget';
import './Home.css';
import SongSearchBar from './SongSearchBar';
import SongCardsList from './SongCardsList'
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedSongs: [],
            features: {},
            featuresModal: false,
            selectedTrack: {},
            playlists: []
        }
        
        this.getInitialSongs = (weatherId) => {
          const userObj = JSON.parse(window.localStorage.getItem('spotify_token')).user;
          
          const userPrefsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/preferences/' + userObj.id;
          const tagsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/tags';
          const headers = {
            Authorization: `Bearer ${this.props.access_token}`
          }
          
          axios.get(userPrefsURL).then(prefResponse => {
            const preferences = prefResponse.data.preferences;
            axios.get(tagsURL).then(tagsResponse => {
              const tags = tagsResponse.data;
              const preferencesForWeater = preferences
                .filter(p => p.weatherTypeId == weatherId)
                .map(p => tags.find(t=>p.tagId==t.id).name);
              const recommendationsURL = window.location.href.split('/').slice(0,-1).join('/') 
            + ':8081/recommendations?preferences='+preferencesForWeater.join(",");
            
            
            axios.get(recommendationsURL,{ headers }).then(response => {
                this.setState({
                    displayedSongs: response.data
                });
            })
            })
          })
            
          
        }
        this.getUserPlaylists = () => {
            const playlistsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/playlists';
            
            const headers = {
                Authorization: `Bearer ${this.props.access_token}`
            };
            
            axios.get(playlistsURL,{ headers }).then(response => {
                this.setState({
                    playlists: response.data.items
                });
            });
        }
    }
    
    componentDidMount() {
        this.getUserPlaylists();
    }
    
    render() {
        const username = JSON.parse(window.localStorage.getItem('spotify_token')).user.name;
        return (
            <div className="container">
            <div className="content-container">
            <div className="container-part1">
             <SongSearchBar class="song-src" access_token={this.props.access_token} />
            <h1 className="welcomemsg">Hello there, {username}!</h1>
            <h2 className="todayrec">Here are today's recommendations for you:</h2>
            </div>
            <div className="container-part2">
              <WeatherWidget getInitialSongs={this.getInitialSongs} />
            </div>
            <div className="whitebar">
            </div>
            <div className="card-section">
              <SongCardsList 
                displayedSongs={this.state.displayedSongs}
                access_token={this.props.access_token}
                playlists={this.state.playlists}
                getUserPlaylists={this.getUserPlaylists}
              />
            </div>
            </div>
            <div className="nav-container"> 
              <SideNavbar access_token={this.props.access_token} playlists={this.state.playlists} getUserPlaylists={this.getUserPlaylists}/>
            </div>
          </div>
        )
    }
}
export default Home;

