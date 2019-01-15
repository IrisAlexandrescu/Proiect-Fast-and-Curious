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
        this.getInitialSongs = () => {
            const searchURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/search?term=metallica';
            
            const headers = {
                Authorization: `Bearer ${this.props.access_token}`
            }
            axios.get(searchURL,{ headers }).then(response => {
                this.setState({
                    displayedSongs: response.data
                });
            })
        }
        this.getUserPlaylists = () => {
            const playlistsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/playlists';
            
            const headers = {
                Authorization: `Bearer ${this.props.access_token}`
            }
            axios.get(playlistsURL,{ headers }).then(response => {
                this.setState({
                    playlists: response.data.items
                });
            })
           
        }
    }
    
    componentDidMount() {
        this.getInitialSongs();
        this.getUserPlaylists();
    }
    
    render() {

        return (
            <div className="container">
            <div className="content-container">
            <div className="container-part1">
             <SongSearchBar class="song-src" access_token={this.props.access_token} />
            <p className="welcomemsg">Hello there</p>
            <p className="todayrec">Here are today's recommendations for you:</p>
            </div>
            <div className="container-part2">
              <WeatherWidget/>
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

