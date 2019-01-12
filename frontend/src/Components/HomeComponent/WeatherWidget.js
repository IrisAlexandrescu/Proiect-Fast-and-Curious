import React from 'react';
import axios from 'axios';
import './WeatherWidget.css';

const apiKey = 'b2d3c80b892e0f4ab4142068bb3b4b0b';
const baseUrl = 'https://api.darksky.net/forecast';
const corsUrl = 'https://cors-anywhere.herokuapp.com';
const iconPath = '../weather-images';

const weatherTypes = [
  'sunny',
  'rainy',
  'cloudy',
  'snowy',
];

class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            summary: '',
            icon: '',
            cityCoords: '44.432251,26.10626',
            
        };
        this.getWeatherData = () => {
                // debugger;
            axios.get(`${corsUrl}/${baseUrl}/${apiKey}/${this.state.cityCoords}`)
                .then((response) => {
                    let { summary, temperature } = response.data.currently;
                    let icon = '';
                    summary = summary.toLowerCase();
                    if (summary.includes('cloud') || summary == 'wind' || summary == 'fog') {
                        icon = 'cloudy.svg';
                    } else if (summary == 'snow' || summary == 'sleet') {
                        icon = 'snowy.svg';
                    } else if (summary == 'rain') {
                        icon = 'rainy.svg';
                    } else if (summary.includes('clear')) {
                        icon = 'sunny.svg';
                    }
                    temperature = Math.round((temperature - 32) / 1.8);
                    this.setState({
                        summary,
                        temperature,
                        icon
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
        const { summary, temperature, icon } = this.state;
        const { width, height } = this.props;
        return (
            <div className='weather-widget'>
               <p className="degrees">{temperature} °C </p>
                <img src={`${iconPath}/${icon}`} alt={icon} width={width} height={height} />
                <p className="todaywth">It's {summary} today</p>
            </div>
        )
    }
}

export default WeatherWidget;