import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function PlaceCard(props) {
  const history = useHistory();
  console.log("Hi", props);
  // props ? props.map((date, i) => {
  // return date.createdAt;
  // }): null
  // }
  // console.log(date);
  const today = new Date().toISOString().split("T")[0];
  console.log("hi", today);
  function onClickHandler(city) {
    history.push(`/details/${city.id}`);
  }
  return (
    <div>
      {props.data.map((city, i) => {
        console.log("I am date", city.createdAt);
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
                <p style={{ marginLeft: 18, marginTop: 8 }}>
                  {new Date(city.createdAt).toISOString().split("T")[0]}
                </p>
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
