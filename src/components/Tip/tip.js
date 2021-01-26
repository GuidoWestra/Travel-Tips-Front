import React from "react";

export default function Tip({ userName, text }) {
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
    </div>
  );
}
