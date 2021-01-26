import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectPlace, selectPlaces } from "../../store/places/selectors";
import { fetchSinglePlace } from "../../store/places/actions";

export default function DetailsCard(props) {
  const dispatch = useDispatch();

  const place = useSelector(selectPlace);

  useEffect(() => {
    dispatch(fetchSinglePlace(props.data));
  }, []);

  if (place)
    return (
      <div>
        <Card
          style={{
            width: 500,
          }}
        >
          <Card.Img
            variant="top"
            src="https://propertyeu.info/media/newsarticles/97/8a/ea/1a/978aea1a-fbd0-41fd-bf81-a46efa1820c5/images/amsterdam-itinerary-houses-canal-xlarge.jpg?w=690"
            // i can't see a pic >> net::ERR_CONNECTION_TIMED_OUT
          />
          <Card.Body>
            <Card.Title>{place.name}</Card.Title>
            <Card.Text>{place.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  else return null;
}
