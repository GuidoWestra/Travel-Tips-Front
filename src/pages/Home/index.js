import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PlaceCard from "../../components/PlaceCard";
import CarouSel from "../../components/CarouSel";
import { fetchPlaces } from "../../store/places/actions";
import { selectPlaces } from "../../store/places/selectors";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [criteria, setCriteria] = useState("");
  const places = useSelector(selectPlaces);
  const dispatch = useDispatch();
  const history = useHistory();

  function navigate() {
    console.log("click");
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
  console.log("list of place", listOfPlaces);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return (
    <div style={{}}>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(event) => setCriteria(event.target.value)}
          value={criteria}
          type="text"
          placeholder="Place"
          style={{ maxWidth: "60%", marginLeft: "20%" }}
        />
      </InputGroup>
      {criteria ? <PlaceCard data={listOfPlaces} /> : <CarouSel />}
      {criteria && listOfPlaces.length === 0 ? (
        <Button style={{ marginLeft: "43%" }} variant="dark" onClick={() => navigate()}>
          Add a new place
        </Button>
      ) : null}
    </div>
  );
}
