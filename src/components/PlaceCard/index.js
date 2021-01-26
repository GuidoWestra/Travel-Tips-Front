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
      {props.data.map((city) => {
        return (
          <Card
            style={{
              marginLeft: "30%",
              width: "40%",
            }}
          >
            <Card.Img
              variant="top"
              src="https://propertyeu.info/media/newsarticles/97/8a/ea/1a/978aea1a-fbd0-41fd-bf81-a46efa1820c5/images/amsterdam-itinerary-houses-canal-xlarge.jpg?w=690"
            />
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
