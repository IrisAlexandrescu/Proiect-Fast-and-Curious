import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardImg, CardTitle, CardSubtitle, CardImgOverlay, Row, Popover, PopoverBody, PopoverHeader, 
  ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';
import './SongCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuresPopoverOpen: false,
      features: null,
      playlistModal: false,
      addTrackToPlaylistSuccess: false,
    };
    this.getTrackFeatures = () => {
      if(!window.featuresMouseoverLock ) {
        window.featuresMouseoverLock = true; 
      } else {
        return;
      }
      
      if (this.state.features != null) {
        this.setState({
          featuresPopoverOpen: true,
        });
        window.featuresMouseoverLock = false;
        return;
      }
      
      const featuresURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/features/' + this.props.id;
            
      const headers = {
        Authorization: `Bearer ${this.props.access_token}`
      };
      
      axios.get(featuresURL,{ headers }).then(response => {
        this.setState({
          features: response.data,
          featuresPopoverOpen: true,
        }, () => {
          window.featuresMouseoverLock = false
        });
      });
    };
    
    this.toggleFeaturesPopover = () => this.setState({ featuresPopoverOpen: false });
    
    this.onMouseOverIcons = (e) => e.stopPropagation();
    
    this.togglePlaylisModal = () => {
      this.setState(previousState => ({
        playlistModal: !previousState.playlistModal,
        addTrackToPlaylistSuccess: false,
      }))
    }
    
    this.addTrackToPlaylist = (trackUri, playlistId) => {
      
      const playlistsURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/playlists';
      const headers = {
          Authorization: `Bearer ${this.props.access_token}`
      }
      axios.post(playlistsURL, {playlistId, uri:trackUri}, { headers }).then(response => {
          this.setState({
            addTrackToPlaylistSuccess: true,
          });
          this.props.getUserPlaylists();
          
      }).catch(ex => console.log(ex))
    }
  }
  
  
  render() {
    const { title, subtitle, imgSrc} = this.props;
    const hasFeatures = this.state.features != null;
    let duration, minutes, seconds;
    if (hasFeatures) {
      duration = this.state.features.duration_ms / 1000;
      minutes = Math.floor(duration / 60);
      seconds = parseInt(duration % 60);
      duration = `${minutes}m ${seconds}s`;
    }
    
    let playlistItems;
    if(this.props.playlists && this.props.playlists.length > 0) {
      playlistItems = this.props.playlists.map((p, i) => (
        <ListGroupItem key={i} onClick={() => this.addTrackToPlaylist(this.props.trackUri, p.id)}>{p.name}</ListGroupItem>)
        );
    } else {
      playlistItems = <ListGroupItem>You don't have any playlists. Access spotify and create at least one.</ListGroupItem>
    }
    
    return (
      <div>
        <Card onDragStart={this.props.handleOnDragStart} 
          className="song-card-container"
          id={`card-${this.props.id}`}
          onMouseOver={this.getTrackFeatures}
          onMouseOut={this.toggleFeaturesPopover}
        >
          
          <CardImg top src={imgSrc} alt={title} />
          <CardImgOverlay>
            <Row className="song-title">
              <CardTitle>{title}</CardTitle>
              <CardSubtitle>{subtitle}</CardSubtitle>
            </Row>
            <Row className="song-action-buttons">
              <FontAwesomeIcon icon={faPlus} color="white" onMouseOver={this.onMouseOverIcons} onClick={this.togglePlaylisModal} />
              <FontAwesomeIcon icon={faHeart} color="white" onMouseOver={this.onMouseOverIcons} />
            </Row>
          </CardImgOverlay>
        </Card>
        <Popover trigger="focus" placement="bottom" isOpen={this.state.featuresPopoverOpen} target={`card-${this.props.id}`} toggle={this.state.toggleFeaturesPopover}>
          <PopoverHeader>Audio features for {title}</PopoverHeader>
          <PopoverBody>
            { hasFeatures && <div>
              <b>Danceability: </b> {this.state.features.danceability} <br />
              <b>Duration: </b> { duration }
            </div> }
            { !hasFeatures && <h6>Loading features...</h6> }
          </PopoverBody>
        </Popover>
        
        <Modal isOpen={this.state.playlistModal} toggle={this.togglePlaylisModal}>
          <ModalHeader toggle={this.togglePlaylisModal}>Your playlists</ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.state.addTrackToPlaylistSuccess && <ListGroupItem><h5>You have succesfully added the track to the playlist!</h5></ListGroupItem>}
              {!this.state.addTrackToPlaylistSuccess && playlistItems}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.togglePlaylisModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default SongCard;