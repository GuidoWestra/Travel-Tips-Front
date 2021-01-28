import React from "react";
import Overlay from "./overlay";
import Login from "../../pages/Login/index";
import SignUp from "../../pages/SignUp/index";
import { useState, useEffect } from "react";
import "./overlay.css";

export default function LoginForm() {
  const [rightPanelActive, set_rightPanelActive] = useState(false);

  useEffect(() => {
    set_rightPanelActive(false);
  }, []);

  const handleClickSignUpButton = () => set_rightPanelActive(true);

  const handleClickSignInButton = () => set_rightPanelActive(false);

  console.log(rightPanelActive);
  return (
    <div
      className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
      id="container"
    >
      <SignUp />
      <Login />
      <Overlay
        handleClickSignInButton={handleClickSignInButton}
        handleClickSignUpButton={handleClickSignUpButton}
      />
    </div>
  );
}
