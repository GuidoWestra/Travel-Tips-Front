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
import { selectPlace } from "../../store/places/selectors";
import { Link } from "react-router-dom";
import { fetchSinglePlace } from "../../store/places/actions";

export default function Details() {
  const place = useParams();
  const placeId = place.id; //should come from a route
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const data = useSelector(selectTipsForPlace);
  const placeData = useSelector(selectPlace);

  const sortedTips = [...data].sort((a, b) => {
    return b.id - a.id;
  });
  // if (sortedTips)
  //   console.log(`list of tips for place with id: ${placeId}`, sortedTips);
  useEffect(() => {
    dispatch(fetchTipsForPlace(placeId));
    dispatch(fetchSinglePlace(placeId));
  }, [dispatch, placeId]);
  return (
    <>
      <Container style={{ marginTop: "32px", padding: "64px" }}>
        <DetailsCard data={placeData} />
        <div class="bg-light p-4 d-flex justify-content-end text-center">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">
                {sortedTips ? sortedTips.length : "0"}
              </h5>
              <small class="text-muted">
                {" "}
                <i class="fa fa-user-circle-o mr-1"></i>Tips
              </small>
            </li>
          </ul>
        </div>{" "}
        {token ? (
          <TipForm placeId={placeId} />
        ) : (
          <p>
            <Link to="/login">Log in</Link> to add a tip!
          </p>
        )}
        <Tip data={sortedTips ? sortedTips : null} placeId={placeId} />
      </Container>
    </>
  );
}
