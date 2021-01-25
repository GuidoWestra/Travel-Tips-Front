import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import PlaceCard from "../../components/PlaceCard";
import { fetchPlaces, fetchSinglePlace } from "../../store/places/actions";
export default function Home() {
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  function onClickHandler() {
    console.log("Search Button Pressed!", place);
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
      {place === "Amsterdam" ? <PlaceCard props={place} /> : null}
    </div>
  );
}
