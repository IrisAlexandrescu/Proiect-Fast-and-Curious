import React from 'react';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody, CardLink, Row, Col, Media } from 'reactstrap';
import './SongCard.css';

const SongCard = (props) => {
  const { title, subtitle, text, imgSrc} = props;
  return (
      <Card onDragStart={props.handleOnDragStart}>
        <CardImg top src={imgSrc} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
          <CardText>{text}</CardText>
          <Row>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-plus"></span></Button></a></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-heart"></span></Button></a></Col>
          </Row>
        </CardBody>
      </Card>
  );
};


export default SongCard;