import React, { useEffect } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
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
              <ListGroup className="list-group-flush">
                <Card.Title style={{ paddingLeft: 18 }}>{city.name}</Card.Title>
                <ListGroupItem>
                  <Card.Text>{city.description}</Card.Text>
                </ListGroupItem>
                <p style={{ marginLeft: 18, marginTop: 8 }}>{city.createdAt}</p>
                <br />
                <Button
                  style={{ marginLeft: 18 }}
                  onClick={() => onClickHandler(city)}
                  variant="dark"
                >
                  Learn More!
                </Button>
              </ListGroup>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
