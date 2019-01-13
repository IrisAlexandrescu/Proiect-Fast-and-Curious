import React from 'react';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody, CardLink, Row, Col, Media } from 'reactstrap';
import add from '../../button-images/add.png';
import love from '../../button-images/love.png';



const SongCard = (props) => {
  return (
    <CardGroup >
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Row>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-plus"></span></Button></a></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-heart"></span></Button></a></Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Row>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-plus"></span></Button></a></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-heart"></span></Button></a></Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Row>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-plus"></span></Button></a></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-heart"></span></Button></a></Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Row>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-plus"></span></Button></a></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><a href={"#"}><Button><span class="glyphicon glyphicon-heart"></span></Button></a></Col>
          </Row>
        </CardBody>
      </Card>
    </CardGroup>
  );
};


export default SongCard;