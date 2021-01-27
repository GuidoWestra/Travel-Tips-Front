import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectPlace } from "../../store/places/selectors";
import { fetchSinglePlace } from "../../store/places/actions";

export default function DetailsCard(props) {
  const dispatch = useDispatch();

  const place = useSelector(selectPlace);

  useEffect(() => {
    dispatch(fetchSinglePlace(props.data));
  }, [dispatch, props.data]);

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
            src={place.photo}
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
