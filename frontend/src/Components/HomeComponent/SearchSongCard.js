import React from 'react';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody, CardLink, Row, Col, Media } from 'reactstrap';
import './SearchSongCard.css';

const SongCard = (props) => {
  const { title, subtitle, text, imgSrc} = props;
  return (
      <Card  className="srccard"onDragStart={props.handleOnDragStart}>
        <CardImg className="cardimg"top src={imgSrc} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
          <CardText>{text}</CardText>
        </CardBody>
      </Card>
  );
};


export default SongCard;