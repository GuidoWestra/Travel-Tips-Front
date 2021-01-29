import React from "react";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function PlaceCard(props) {
  const history = useHistory();

  function onClickHandler(city) {
    history.push(`/details/${city.id}`);
  }
  return (
    <div>
      {props.data.map((city, i) => {
        return (
          <Card
            key={i}
            style={{
              marginLeft: "10%",

              marginTop: 20,
            }}
          >
            <Row>
              <Col>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <Card.Title style={{ paddingLeft: 18 }}>
                      {city.name}
                    </Card.Title>
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
              </Col>{" "}
              <Col>
                <Card.Img
                  style={{ width: "430px", alignSelf: "center" }}
                  src={city.photo}
                />
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
}
