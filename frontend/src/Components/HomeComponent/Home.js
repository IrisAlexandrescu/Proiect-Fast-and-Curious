import React from 'react';
import Navbar from './Navbar';
import WeatherWidget from './WeatherWidget';
import './Home.css';
import SongSearchBar from './SongSearchBar';
import SongCard from './SongCard'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container">
            <div className="content-container">
            <div className="container-part1">
            <SongSearchBar />
            <p className="welcomemsg">Hello there</p>
            <p className="todayrec">Here are today's recommendations for you:</p>
            </div>
            <div className="container-part2">
            <WeatherWidget/>
            </div>
            <div className="whitebar">
            </div>
              <div className="card-section">
            <SongCard />
            </div>
              <div className="whitebar2">
            </div>
            </div>
            <div className="nav-container"/> 
            </div>
        )
    }
}

export default Home;