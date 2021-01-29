import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessageWithTimeout } from "../../store/appState/actions";

import PlaceCard from "../../components/PlaceCard";
import cx from "classnames";
import { Col, Row } from "react-bootstrap";
import { fetchPlaces } from "../../store/places/actions";
import { selectPlaces } from "../../store/places/selectors";
import { useHistory } from "react-router-dom";
import "./index.css";
import { selectToken } from "../../store/user/selectors";

export default function Home() {
  const [criteria, setCriteria] = useState("");
  const places = useSelector(selectPlaces);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, set_open] = useState(false);
  const token = useSelector(selectToken);

  function navigate() {
    if (!token) {
      dispatch(showMessageWithTimeout("danger", true, "Please login to create new places!"));
      setCriteria("");
      return;
    }
    history.push("/placeform");
  }

  function search() {
    if (places) {
      return places.filter(
        (item) =>
          !item.name.toLowerCase().search(criteria.toLowerCase()) ||
          !item.city.toLowerCase().search(criteria.toLowerCase())
      );
    } else return null;
  }
  const listOfPlaces = search();

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col
          style={{
            marginTop: "6em",
            marginLeft: "2em",
          }}
        >
          {" "}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                color: "grey",
                marginTop: "1em",
                marginLeft: "4em",
                marginBottom: "2em",
              }}
            >
              Open The Netherlands<br></br> with Travel.Tips
            </h3>
          </div>
          <div
            className={cx("searchbar", {
              "is-open": open,
            })}
            style={{ width: "200px", margin: "auto" }}
          >
            <input
              style={{ borderRadius: "15px" }}
              onFocus={(e) => set_open(true)}
              onBlur={(e) => set_open(false)}
              onChange={(event) => setCriteria(event.target.value)}
              value={criteria}
              type="text"
              placeholder="Place"
            />
          </div>
          {criteria && listOfPlaces.length === 0 ? (
            <button
              className="form-button"
              style={{ marginLeft: "39%", marginTop: "2em" }}
              variant="dark"
              onClick={() => navigate()}
            >
              Add a new place
            </button>
          ) : null}
        </Col>
        <Col xs={12} md={8}>
          {criteria || places ? <PlaceCard data={listOfPlaces ? listOfPlaces : places} /> : null}
        </Col>
      </Row>
    </div>
  );
}
