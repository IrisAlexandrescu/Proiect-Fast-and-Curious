import React from 'react';
import Select, {components} from 'react-select';
import './PreferenceSelector.css';


const preferenceOptions = [
    { value:'calmness', label: 'Calmness'},    
    { value:'chill', label: 'Chill'},
    { value:'classic', label: 'Classical'},
    { value:'dance', label: 'Dance'},
    { value:'dark', label: 'Dark'},
    { value:'electronic', label: 'Electronic'},
    { value:'energy', label: 'Energy'},
    { value:'focus', label: 'Focus'},
    { value:'gaming', label: 'Gaming'},
    { value:'happy', label: 'Happy'},
    { value:'instrumental', label: 'Instrumental'},
    { value:'lounge', label: 'Lounge'},
    { value:'party', label: 'Party'},
    { value:'positive-vibes', label: 'Positive vibes'},
    { value:'quiet', label: 'Quiet'},
    { value:'romance', label: 'Romance'},
    { value:'sadness', label: 'Sadness'},
    { value:'sentimental', label: 'Emotional'},
    { value:'soft', label: 'Soft'},
    { value:'uplifting', label: 'Uplifting'},
    { value:'workout', label: 'Workout'}
]

const customStyles = {
  control: base => ({
    ...base,
    background: "#3C4345",
    borderColor: "#626E70",
  }),
  menuList: base => ({
    ...base,
    textAlign: 'center',
    backgroundColor:"#3C4345",
  }),
};

const PreferenceSelector = (props) => {
    let closeMenuOnSelect;
        if (props.selectedPreferences == null || props.selectedPreferences.length < 4) {
            closeMenuOnSelect = false;
        } else {
            closeMenuOnSelect = true;
        }
        return (
            <div className = "preference-selector-container">
                <h1>Choose your preferences</h1>
                <img
                  className = "weather-type-icon"
                  src={`../weather-images/${props.weatherType}.svg`}
                  alt={props.weatherType} 
                  width="200px" height="200px" />
                <h5> 
                  {`What do you feel like listening to when the weather is ${props.weatherType}?`}
                </h5>
                <Select
                    className = "pref-select"
                    styles = {customStyles} 
                    value = {props.selectedPreferences}
                    closeMenuOnSelect = {closeMenuOnSelect}
                    components = {{ Option }}
                    options = {preferenceOptions}
                    onChange = {props.handleChange}
                    isMulti = {true}
                />
            </div>
        )
}

const Option = (props) => {
    return (
        <div className="preference-option">
            <components.Option {...props}>
                <img src={`../preferences-images/${props.value}.png`} alt="preference" width="150px" height="150px" />
            </components.Option>
        </div>
    )
}

export default PreferenceSelector;