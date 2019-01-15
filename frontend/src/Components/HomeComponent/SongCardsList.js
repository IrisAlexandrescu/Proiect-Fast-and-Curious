import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './SongCard.css';
import SongCard from './SongCard.js';

const SongCardsList = (props) => {
  const responsive = {
    0: { items: 5 },
  };
  const cards = props.displayedSongs.map((song, i) => {
    return (
      <SongCard 
        imgSrc={song.image_url} 
        title={song.name} 
        subtitle={song.artists.join(',')} 
        key={i} 
        id={song.id}
        getTrackFeatures={props.getTrackFeatures}
        access_token={props.access_token}
        playlists={props.playlists}
        trackUri={song.uri}
        getUserPlaylists={props.getUserPlaylists} 
        />
      )})
  return (
    <AliceCarousel responsive={responsive}>
        {cards}
    </AliceCarousel>
  );
};


export default SongCardsList;