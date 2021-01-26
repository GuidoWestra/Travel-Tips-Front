import React from "react";

export default function Tip({ userName, text }) {
  console.log(`tip`, userName, text);
  return (
    <div style={{ margin: "20px", padding: "15px", border: "1px solid black" }}>
      <h5>{userName}</h5>
      <p>{text}</p>
    </div>
  );
}
