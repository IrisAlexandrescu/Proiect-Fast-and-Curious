import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './PreferencesModal.css';
import PreferenceSelector from './PreferenceSelector';
import UserForm from './UserForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      selectedPreferences : {}
    }

    this.handleNext = () => {
      const selectedPreferences = this.state.selectedPreferences;
      
      if (this.state.modalPage > 0 && this.state.modalPage < 5 &&
      
        (selectedPreferences[this.state.modalPage] === null ||
         selectedPreferences[this.state.modalPage].length === 0 ||
         selectedPreferences[this.state.modalPage].length < 5)) {
          toast("You need to select 5 preferences for this weather type!");
          return;
      }
      if (this.state.modalPage === 5) {
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
              <UserForm />
            }
            
            { modalPage === 5 && 
              <h1 className="preferences-confirmation"> You're all set and ready to begin! </h1>
            }
            
            { modalPage > 0 && modalPage < 5  &&
                <PreferenceSelector 
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
