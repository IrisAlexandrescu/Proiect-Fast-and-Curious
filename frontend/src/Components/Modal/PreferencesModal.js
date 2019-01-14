import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './PreferencesModal.css';
import PreferenceSelector from './PreferenceSelector';
import UserForm from './UserForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const WeatherTypes = [
  null,
  {type:'sunny'},
  {type:'rainy'},
  {type:'cloudy'},
  {type:'snowy'},
]

class PreferencesModal extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      modalOpened: true,
      modalPage: 0,
      selectedPreferences : {},
      username: '',
      tags: [],
      weatherTypes: [],
      user: {}
    }

    this.handleNext = () => {
      const selectedPreferences = this.state.selectedPreferences;
      if (this.state.modalPage === 0) {
        this.addUser(this.state.username);
      }
      if (this.state.modalPage > 0 && this.state.modalPage < 5 &&
      
        (selectedPreferences[this.state.modalPage] === null ||
         selectedPreferences[this.state.modalPage].length === 0 ||
         selectedPreferences[this.state.modalPage].length < 5)) {
          toast("You need to select 5 preferences for this weather type!");
          return;
      }
      if (this.state.modalPage === 5) {
        console.log(selectedPreferences);
        this.addUserPreferences();
        this.setState({
          modalOpened: false,
        });
        return;
      }
      selectedPreferences[this.state.modalPage + 1] = null;
      
      this.setState(previousState => ({
        modalPage: previousState.modalPage + 1,
        selectedPreferences
      }));
    }
    
    this.handleChange = (selectedOption) => {
      if (selectedOption.length > 5) {
        toast("You can only select 5 preferences for a weather type!");
        return;
      }
      
      const selectedPreferences = this.state.selectedPreferences;
      selectedPreferences[this.state.modalPage] = selectedOption;
      
      this.setState({
        selectedPreferences
      })
    }
    
    this.handleUsernameChange = (e) => {
      this.setState({
        username: e.target.value
      })
    }
    
    this.addUser = (name) => {
      const addUserURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/users';
      axios.post(addUserURL, { newUser: { name } }).then(response => {
        this.setState({
          user: response.data
        });
        const localTokenObj = {
          timestamp: new Date(),
          access_token: this.props.access_token,
          user: response.data,
        }
        
        window.localStorage.setItem('spotify_token', JSON.stringify(localTokenObj))
      });
      
    }
    
    this.getTags = () => {
      const tagsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/tags';
      axios.get(tagsURL).then(response => {
        const tags = [];
        response.data.forEach(tag => {
          const value = tag.name.split(' ').join('-');
          const label = tag.name;
          const { id } = tag;
          const tagObj = {
            id,
            value,
            label
          };
          tags.push(tagObj);
        })
        this.setState({
          tags
        })
        
      })
    }
    
    this.getWeatherTypes = () => {
      const weatherTypesURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/weatherTypes';
      axios.get(weatherTypesURL).then(response => {
        this.setState({
          weatherTypes: response.data,
        })
      })
    }
    
    this.addUserPreferences = () => {
      let newPreferences = [];
      for (let i = 0; i < this.state.weatherTypes.length; i++) {
        let prefsForWeatherType = Object.values(this.state.selectedPreferences)[i];
        for(let item of prefsForWeatherType) {
          newPreferences.push({
            tagId: item.id,
            weatherTypeId: this.state.weatherTypes[i].id,
          })
        }
      }
      this.props.finishAddingPreferences();
      console.log('here', newPreferences);
      const prefURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/preferences';
      axios.post(prefURL, { userId: this.state.user.id, newPreferences }).then(response => {
        console.log(response);
      })
    }
  }
  
  componentDidMount() {
    this.getTags();
    this.getWeatherTypes();
  }
  
  
  render() {
    const { modalOpened, selectedPreferences, modalPage } = this.state;
    const buttonMessage = modalPage < 5 ? 'Next' : 'Save and proceed';
    return (
      <div>
      
       <Modal isOpen = {modalOpened} className = {this.props.className}>
        <ToastContainer />
          <ModalBody>
            { modalPage === 0 &&
              <UserForm username={this.state.username} handleUsernameChange={this.handleUsernameChange}/>
            }
            
            { modalPage === 5 && 
              <h1 className="preferences-confirmation"> You're all set and ready to begin! </h1>
            }
            
            { modalPage > 0 && modalPage < 5  &&
                <PreferenceSelector 
                  tags = {this.state.tags}
                  selectedPreferences = {selectedPreferences[modalPage]}
                  handleChange = {this.handleChange}
                  weatherType = {WeatherTypes[modalPage].type}
                />
            }
          </ModalBody>
          <ModalFooter>
            <Button outline color = "primary" onClick = {this.handleNext}> {buttonMessage}</Button>
          </ModalFooter>
        </Modal>
      </div> 
    );
  }
}

export default PreferencesModal;
