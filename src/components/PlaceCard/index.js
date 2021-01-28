import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function PlaceCard(props) {
  const history = useHistory();

  function onClickHandler(city) {
    history.push(`/details/${city.id}`);
  }
  useEffect(() => {}, []);
  return (
    <div>
      {props.data.map((city, i) => {
        return (
          <Card
            key={i}
            style={{
              marginLeft: "30%",

              marginTop: 20,
            }}
          >
            <Card.Img variant="top" src={city.photo} />
            <Card.Body>
              <Card.Title>{city.name}</Card.Title>
              <Card.Text>{city.description}</Card.Text>
              <Button onClick={() => onClickHandler(city)} variant="dark">
                Learn More!
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
