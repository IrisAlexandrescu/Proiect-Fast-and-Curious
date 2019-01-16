import React from 'react';
import axios from 'axios';
import './WeatherWidget.css';

const apiKey = 'b2d3c80b892e0f4ab4142068bb3b4b0b';
const baseUrl = 'https://api.darksky.net/forecast';
const corsUrl = 'https://cors-anywhere.herokuapp.com';
const iconPath = '../weather-images';

class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            summary: '',
            iconName: '',
            cityCoords: '44.432251,26.10626',
            
        };
        this.getWeatherData = () => {
                // debugger;
            axios.get(`${corsUrl}/${baseUrl}/${apiKey}/${this.state.cityCoords}`)
                .then((response) => {
                    let { summary, temperature, icon } = response.data.currently;
                    let iconName = '';
                    
                    
                    
                    icon = icon.toLowerCase();
                    let currentWeatherTypeId;
                    if (icon.includes('cloud') || icon === 'wind' || icon === 'fog') {
                        iconName = 'cloudy.svg';
                        currentWeatherTypeId=3;
                    } else if (icon === 'snow' || icon === 'sleet') {
                        iconName = 'snowy.svg';
                        currentWeatherTypeId=1;
                    } else if (icon === 'rain') {
                        iconName = 'rainy.svg';
                        currentWeatherTypeId=4;
                    } else if (icon.includes('clear')) {
                        iconName = 'sunny.svg';
                        currentWeatherTypeId=2;
                    }
                    
                    this.props.getInitialSongs(currentWeatherTypeId);

                    temperature = Math.round((temperature - 32) / 1.8);
                    this.setState({
                        summary,
                        temperature,
                        iconName
                    });
                }).catch((exception) => {
                    console.log(exception); 
                });
        }
    }
    
    componentDidMount() {
        this.getWeatherData();
    }
    
    render() {
        const { summary, temperature, iconName } = this.state;
        const { width, height } = this.props;
        return (
            <div className='weather-widget'>
               <p className="degrees">{temperature} °C </p>
                <img src={`${iconPath}/${iconName}`} alt={iconName} width={width} height={height} />
                <p className="todaywth">Today's weather: {summary}</p>
            </div>
        )
    }
}

export default WeatherWidget;