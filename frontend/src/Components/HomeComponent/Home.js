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
            displayedSongs: []
        }
        this.getInitialSongs = () => {
            const searchURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/search?term=metallica';
            
            const headers = {
                Authorization: `Bearer ${this.props.access_token}`
            }
            axios.get(searchURL,{ headers }).then(response => {
                this.setState({
                    displayedSongs: response.data
                })
            })
        }
    }
    
    componentDidMount() {
        this.getInitialSongs();
    }
    
    render() {
        return (
            <div className="container">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>

            
            <div className="content-container">
            <div className="container-part1">
            <p className="welcomemsg">Hello there</p>
            <p className="todayrec">Here are today's recommendations for you:</p>
            </div>
            <div className="container-part2">
            <WeatherWidget/>
            </div>
            <div className="whitebar">
            </div>
              <div className="card-section">
            <SongCardsList displayedSongs={this.state.displayedSongs} />
            </div>
              <div className="whitebar2">
            </div>
            <p className="welcomemsg1">Search for your favourite songs</p>
             <SongSearchBar access_token={this.props.access_token} />
             <div className="whitebar3"/>
            </div>
            <div className="nav-container"> 
            <SideNavbar/>
            </div>
            </div>
        )
    }
}
export default Home;