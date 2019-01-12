import React from 'react';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody } from 'reactstrap';
const SongCard = (props) => {
  return (
    <CardGroup >
      <Card>
        <CardImg className="cardimg"top width="20%"src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Song Name</CardTitle>
          <Button className="btn1">Button</Button>
          <Button className="btn2">Button</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg className="cardimg" top width="100%" height="50px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
         <Button className="btn1">Button</Button>
          <Button className="btn2">Button</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg className="cardimg" top width="100%" height="50px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Song Name</CardTitle>
         <Button className="btn1">Button</Button>
          <Button className="btn2">Button</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg className="cardimg" top width="100%"  height="50px"src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
        <CardBody>
            <CardTitle>Song Name</CardTitle>
          <Button className="btn1">Button</Button>
          <Button className="btn2">Button</Button>
        </CardBody>
      </Card>
    </CardGroup>
  );
};


export default SongCard;