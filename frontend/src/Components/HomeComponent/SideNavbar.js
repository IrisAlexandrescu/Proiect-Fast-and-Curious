import React from "react";
import './SideNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSignOutAlt, faLock, faLockOpen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroupItem, ListGroup } from 'reactstrap';
import axios from 'axios';

import settings from '../../button-images/settings.png'

class SideNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewPlaylistsModal: false,
			playlistsDetails: [],
			showingTracksForPlaylist: false,
			tracks: []
			
		}
		
		this.toggle = () => {
			this.setState((previousState) => ({
				viewPlaylistsModal:!previousState.viewPlaylistsModal,
				showingTracksForPlaylist: false,
			}))
		}
		
		this.createPlaylistElement = (playlist) => {
			const image = playlist.images[0];
			const imageUrl = image ? image.url : 'http://placekitten.com/300/300';
			return (
				<ListGroupItem className="playlist-item" key={`playlist-item-${playlist.id}`}>
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
					<FontAwesomeIcon icon={faEye} color="gray" onClick={() => this.getTrackForPlaylist(playlist)} />
				</span>
				</ListGroupItem>
			)
		}
		
		this.getTrackForPlaylist = (playlist) => {
			const headers = {
    		Authorization: `Bearer ${this.props.access_token}`
      }
    	axios.get(playlist.tracks.href, { headers }).then(response => {
    		console.log(response.data);
    		let tracks = [];
    		response.data.items.forEach(item => {
    			let name = item.track.name;
    			let duration_ms = item.track.duration_ms;
    			let artists = [];
    			let uri = item.track.uri;
    			let id = item.track.id;
    			let imageUrl = item.track.album.images[0].url;
    			imageUrl = imageUrl ? imageUrl : 'http://placekitten.com/300/300';
    			item.track.artists.forEach(artist => artists.push(artist.name));
    			artists = artists.join(", ");
    			tracks.push({
    				name,
    				duration_ms,
    				artists,
    				uri,
    				id,
    				imageUrl,
    				parentPlaylistId: playlist.id,
    			});
    			this.setState({
    				tracks,
    				showingTracksForPlaylist: true
    			})
    		});
    		
			})
		}
		
		this.createTrackElement = (track) => {
			let duration = track.duration_ms / 1000;
      let minutes = Math.floor(duration / 60);
      let seconds = parseInt(duration % 60);
      duration = `${minutes}m ${seconds}s`;
			return (
				<ListGroupItem className="playlist-item" key={`track-item-${track.id}`}>
				<div className="playlist-item-content">
					<img src={track.imageUrl} alt={`Album cover for ${track.name}`} width="300px" height="300px" />
					<div className="playlist-details">
						<h5>{track.name}</h5>
						<h6>{track.artists}</h6>
						<span>{duration}</span>
					</div>
				</div>
				<span className="playlist-track-details">
					<FontAwesomeIcon icon={faTrash} color="red" onClick={() => this.deleteTrackFromPlaylist(track.uri, track.parentPlaylistId)} />
				</span>
				</ListGroupItem>
			)
		}
		
		this.backToAllPlaylists = () => {
			this.setState({
				showingTracksForPlaylist: false
			})
		}
		
		this.deleteTrackFromPlaylist = (trackURI, playlistId) => {
			const deleteTrackFromPlaylistURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/playlists/?playlistId=' + playlistId + '&trackURI=' + trackURI;
      console.log(deleteTrackFromPlaylistURL);
      const headers = {
        Authorization: `Bearer ${this.props.access_token}`
      }
      
      axios.delete(deleteTrackFromPlaylistURL, { headers }).then(response => {
      	const playlist = this.props.playlists.find(p => p.id === playlistId);
      	this.getTrackForPlaylist(playlist);
      	this.props.getUserPlaylists();
      })
		}
		
		
	}
	
	signOut = () => {
		window.localStorage.removeItem('spotify_token');
		window.location.reload();
	}
	
  render() {
  	
  	//const playURL = "https://open.spotify.com/embed/track/" +uri.split(":")[2];
  	
  	let playlistsElements;
  	if (this.props.playlists && this.props.playlists.length > 0) {
  		playlistsElements = this.props.playlists.map(this.createPlaylistElement);
  	}
  	let trackElements;
  	if (this.state.showingTracksForPlaylist && this.state.tracks && this.state.tracks.length > 0) {
  		trackElements = this.state.tracks.map(this.createTrackElement);
  	}
  	if (this.state.tracks && this.state.tracks.length === 0) {
  		trackElements = <ListGroupItem> <h4> You don't have any tracks on this playlist :( </h4> </ListGroupItem>
  	}
	  return(
			<div className="sidebar">
				<div className="w3-sidebar w3-bar-block">
					<FontAwesomeIcon icon={faMusic} color="black" size="3x" onClick={this.toggle} />
					<FontAwesomeIcon icon={faSignOutAlt} color="black" size="3x" onClick={this.signOut} />
				</div>
				<Modal isOpen={this.state.viewPlaylistsModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          	{!this.state.showingTracksForPlaylist && <span>Your playlists</span>}
          	{this.state.showingTracksForPlaylist && <span>Your songs for this playlist</span>}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
            	{!this.state.showingTracksForPlaylist && playlistsElements}
            	{this.state.showingTracksForPlaylist && trackElements}
           
            </ListGroup>
          </ModalBody>
          <ModalFooter>
          	{!this.state.showingTracksForPlaylist && <Button color="secondary" onClick={this.toggle}>Close</Button>}
            {this.state.showingTracksForPlaylist && <Button color="secondary" onClick={this.backToAllPlaylists}>Back</Button>}
          </ModalFooter>
        </Modal>
			</div>
	  );
	}
}

export default SideNavbar;