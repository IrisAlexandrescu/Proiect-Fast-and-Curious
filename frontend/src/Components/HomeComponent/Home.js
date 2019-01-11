import React from 'react';
import WeatherWidget from './WeatherWidget'
import ContentContainer from './ContentContainer/ContentContainer';
import Navbar from './Navbar';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <WeatherWidget width="250px" height="250px"/>
                <Navbar />
                <ContentContainer />
            </div>
        )
    }
}

export default Home;