import React from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Jumbotron } from "react-bootstrap";

export default function Home() {
  const [place, setPlace] = useState("");

  function onClickHandler() {
    console.log("Search Button Pressed!", place);
  }

  return (
    <div>
      <Jumbotron>
        <h1>HomePage</h1>
      </Jumbotron>
      <InputGroup className="mb-3">
        <FormControl
          style={{ width: 100 }}
          onChange={(event) => setPlace(event.target.value)}
          value={place}
          placeholder="Place"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button onClick={() => onClickHandler()} variant="outline-dark">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
