import React from "react";
import { Card } from "react-bootstrap";

export default function DetailsCard(props) {
  //console.log("im props", props.data);

  const place = props.data;

  if (place)
    return (
      <div>
        <Card>
          <Card.Img src={place.photo} />
          <Card.Body>
            <Card.Title>{place.name}</Card.Title>
            <Card.Text>{place.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  else return null;
}
