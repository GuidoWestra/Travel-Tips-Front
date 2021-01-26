import React from "react";
import { deleteTip } from "../../store/tips/actions";
import { useDispatch } from "react-redux";

export default function Tip({ userName, text, id, placeId }) {
  const dispatch = useDispatch();
  const like = 0; //hardcode it for now
  return (
    <div style={{ margin: "20px", padding: "15px", border: "1px solid black" }}>
      <h5>{userName}</h5>
      <p>{text}</p>
      {like ? (
        <span style={{ fontSize: "20px" }}>❤ {like}</span>
      ) : (
        <span style={{ fontSize: "20px" }}>♡ {like}</span>
      )}
      <span
        onClick={() => {
          dispatch(deleteTip(id, placeId));
        }}
        style={{
          margin: "10px",
          color: "crimson",
          fontSize: "25px",
          cursor: "pointer",
        }}
      >
        <b>⦻</b>
      </span>
    </div>
  );
}
