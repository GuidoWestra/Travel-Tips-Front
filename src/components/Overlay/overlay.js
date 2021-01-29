import React from "react";
import { Link } from "react-router-dom";

export default function Overlay({ handleClickSignUpButton, handleClickSignInButton }) {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p className="overlay-description">
            log in to your account to leave tips <br /> and edit your profile
            <br />
            <br />
            <span>
              <Link style={{ color: "white" }} to="/home">
                back to home page
              </Link>
            </span>
          </p>
          <button className="ghost form-button" id="signIn" onClick={handleClickSignInButton}>
            Log In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p className="overlay-description">
            create an account to add tips!
            <br />
            <br />
            <span>
              <Link style={{ color: "white" }} to="/home">
                back to home page
              </Link>
            </span>
          </p>
          <button className="ghost form-button" id="signUp" onClick={handleClickSignUpButton}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
