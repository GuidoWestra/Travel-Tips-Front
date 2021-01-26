import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PlaceCard from "../../components/PlaceCard";
import CarouSel from "../../components/CarouSel";
import { fetchPlaces, fetchSinglePlace } from "../../store/places/actions";
import { selectPlaces } from "../../store/places/selectors";

export default function Home() {
  const [criteria, setCriteria] = useState("");
  const places = useSelector(selectPlaces);
  const dispatch = useDispatch();

  // places = all places
  // place = search criteria

  function search() {
    console.log("I am places", places);
    if (places) {
      return places.filter(
        (item) =>
          !item.name.toLowerCase().search(criteria.toLowerCase()) ||
          !item.city.toLowerCase().search(criteria.toLowerCase())
      );
    } else return null;
  }
  const listOfPlaces = search();
  console.log("I am list of places!", listOfPlaces);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, []);

  return (
    <div style={{ alignItems: "center" }}>
      <Jumbotron>
        <h1>HomePage</h1>
      </Jumbotron>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(event) => setCriteria(event.target.value)}
          value={criteria}
          type="text"
          placeholder="Place"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
      {criteria ? <PlaceCard data={listOfPlaces} /> : <CarouSel />}
      {/* {place !== "Amsterdam" ? <CarouSel /> : null} */}
      {/* {place === "Amsterdam" ? <PlaceCard props={place} /> : null} */}
    </div>
  );
}
