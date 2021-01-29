import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTip } from "../../store/tips/actions";

export default function TipForm({ placeId }) {
  const [text, set_text] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addTip(placeId, text));
          set_text("");
        }}
      >
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h6>
              <b>Add your tip!</b>
            </h6>
          </Form.Label>
          <Form.Control
            autoFocus
            onChange={(e) => {
              set_text(e.target.value);
            }}
            value={text}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button type="submit" variant="info">
          Add tip
        </Button>
      </Form>
    </div>
  );
}
