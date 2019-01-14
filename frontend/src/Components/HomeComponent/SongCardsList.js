import React from 'react';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody, CardLink, Row, Col, Media } from 'reactstrap';
import add from '../../button-images/add.png';
import love from '../../button-images/love.png';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './SongCard.css';
import SongCard from './SongCard.js';

const SongCardsList = (props) => {
  const handleOnDragStart = e => e.preventDefault()
  const responsive = {
    0: { items: 4 },
  };
  const cards = props.displayedSongs.map((song, i) => {
  console.log(song);
    return (
      <SongCard 
        imgSrc={song.image_url} 
        title={song.name} 
        subtitle={song.artists.join(',')} 
        key={i} 
        handleOnDragStart={handleOnDragStart}
        />
      )})
      console.log(cards);
  return (
    <AliceCarousel mouseDragEnabled responsive={responsive}>
        {cards}
    </AliceCarousel>
  );
};


export default SongCardsList;