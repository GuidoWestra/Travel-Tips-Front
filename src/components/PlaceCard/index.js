import React from "react";
import { Button, Card } from "react-bootstrap";

export default function PlaceCard(props) {
  console.log("I am props inside PlaceCard", props);
  return (
    <div>
      <Card
        style={{
          position: "absolute",
          marginLeft: "30%",
          width: "40%",
          // top: "50%",
          // transform: "translate(-50%, -50%)",
        }}
      >
        <Card.Img
          variant="top"
          src="https://propertyeu.info/media/newsarticles/97/8a/ea/1a/978aea1a-fbd0-41fd-bf81-a46efa1820c5/images/amsterdam-itinerary-houses-canal-xlarge.jpg?w=690"
        />
        <Card.Body>
          <Card.Title>Amsterdam!</Card.Title>
          <Card.Text>
            Amsterdam is one of the greatest small cities in the world. From Amsterdam canals to
            world-famous Amsterdam museums and historical Amsterdam sights, it is one of the most
            romantic and beautiful cities in Europe. Canal cruises are a popular way to see the city
            from the perspective of its canals.
          </Card.Text>
          <Button variant="dark">Learn More!</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
