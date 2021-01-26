import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PlaceCard from "../../components/PlaceCard";
import CarouSel from "../../components/CarouSel";
import { fetchPlaces, fetchSinglePlace } from "../../store/places/actions";
import { selectPlaces } from "../../store/places/selectors";

export default function Home() {
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const places = useSelector(selectPlaces);
  console.log("I am places on homepage", places);
  function onClickHandler() {
    console.log("Search Button Pressed!", place);
    dispatch(fetchSinglePlace(place));
  }

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
          onChange={(event) => setPlace(event.target.value)}
          value={place}
          placeholder="Place"
        />
        <InputGroup.Append>
          <Button onClick={() => onClickHandler()} variant="outline-dark">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <CarouSel />

      {/* {place === "Amsterdam" ? <PlaceCard props={place} /> : <p>click here to make a new place</p>} */}
    </div>
  );
}
