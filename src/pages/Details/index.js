import React from "react";
import TipForm from "../../components/Tip/form";
import Tip from "../../components/Tip/tip";
import { useEffect } from "react";
import { fetchTipsForPlace } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectTipsForPlace } from "../../store/tips/selectors";
import { useParams } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard";
import { Container } from "react-bootstrap";
import { selectToken } from "../../store/user/selectors";
import { Link } from "react-router-dom";

export default function Details() {
  const place = useParams();
  const placeId = place.id; //should come from a route
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const data = useSelector(selectTipsForPlace);
  console.log(data);

  const sortedTips = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  useEffect(() => {
    dispatch(fetchTipsForPlace(placeId));
  }, [dispatch, placeId]);
  return (
    <Container style={{ maxWidth: 500 }}>
      <h3>I am the details page</h3>
      <DetailsCard data={placeId} />
      {token ? (
        <TipForm placeId={placeId} />
      ) : (
        <p>
          <Link to="/login">Log in</Link> to add a tip!
        </p>
      )}
      <Tip data={sortedTips ? sortedTips : null} placeId={placeId} />
    </Container>
  );
}
