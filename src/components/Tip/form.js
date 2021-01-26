import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function TipForm() {
  const [text, set_text] = useState("");
  console.log(`bla bla bla`, text);
  return (
    <div style={{ margin: "20px" }}>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h6>
              <b>Add your tip!</b>
            </h6>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              set_text(e.target.value);
            }}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button variant="info">Add tip</Button>
      </Form>
    </div>
  );
}
