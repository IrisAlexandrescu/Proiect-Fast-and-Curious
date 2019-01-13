import React from 'react';
import SideNavbar from './SideNavbar';
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
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>

            
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
            <div className="nav-container"> 
            <SideNavbar/>
            </div>
            </div>

        )
    }
}

export default Home;