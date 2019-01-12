import React from 'react';
import './ContentContainer.css';
import WeatherWidget from './WeatherWidget'

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container">
            <div className="content-container"/>
            <div className="nav-container"/> 
            </div>
        )
        
    }
}

export default ContentContainer;