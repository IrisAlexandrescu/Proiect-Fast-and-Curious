import React from "react";
import './SideNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSignOutAlt, faLock, faLockOpen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroupItem, ListGroup } from 'reactstrap';
import axios from 'axios';

import settings from '../../button-images/settings.png'

class SideNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewPlaylistsModal: false,
			playlistsDetails: []
			
		}
		
		this.toggle = () => {
			this.setState((previousState) => ({viewPlaylistsModal:!previousState.viewPlaylistsModal}))
		}
		
		this.createPlaylistElement = (playlist) => {

			const image = playlist.images[0];
			const imageUrl = image ? image.url : 'http://placekitten.com/300/300';
			return (
				<ListGroupItem className="playlist-item" color="info" key={`playlist-item-${playlist.id}`}>
				<div className="playlist-item-content">
					<img src={imageUrl} alt={`Playlist cover for ${playlist.name}`} width="300px" height="300px" />
					<div className="playlist-details">
						<h5>{playlist.name}</h5>
						<h6>Owner: {playlist.owner.display_name}</h6>
						{!playlist.public && <span><FontAwesomeIcon icon={faLock} color="black" /> Private playlist</span> }
						{playlist.public && <span><FontAwesomeIcon icon={faLockOpen} color="black" /> Public playlist</span> }
					</div>
					</div>
					<span className="playlist-track-details">
						<FontAwesomeIcon icon={faEye} color="gray" />
					</span>
				</ListGroupItem>
			)
		}
	}
	
	signOut = () => {
		window.localStorage.removeItem('spotify_token');
		window.location.reload();
	}
	
  render() {
  	let playlistsElements;
  	if(this.props.playlists && this.props.playlists.length > 0) {
  		playlistsElements = this.props.playlists.map(this.createPlaylistElement);
  	}
	  return(
			<div className="sidebar">
				<div className="w3-sidebar w3-bar-block"> 
					<FontAwesomeIcon icon={faMusic} color="black" size="3x" onClick={this.toggle} />
					<FontAwesomeIcon icon={faSignOutAlt} color="black" size="3x" onClick={this.signOut} />
				</div>
				<Modal isOpen={this.state.viewPlaylistsModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your playlists</ModalHeader>
          <ModalBody>
            <ListGroup>
            {playlistsElements}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
			</div>
	  );
	}
}

export default SideNavbar;