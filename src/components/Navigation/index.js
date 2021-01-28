import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { useLocation } from "react-router-dom";

import "./nav.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";

export default function Navigation() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <nav className="navigation">
      <Navbar.Brand className="logof" as={NavLink} to="/">
        Travel.Tips
      </Navbar.Brand>
      <label className="somelabel" aria-hidden="true" for="toggle">
        <i className="fas fa-bars"></i>
      </label>

      <input
        className="someinput"
        aria-hidden="true"
        name="toggle"
        id="toggle"
        type="checkbox"
      ></input>

      <ul>
        <li className="link">
          <a className="somelink" href="/">
            Landing
          </a>
        </li>
        <li className="link">
          <a
            style={{
              color: location.pathname === "/home" ? "black" : null,
            }}
            className="somelink"
            href="/home"
          >
            Home
          </a>
        </li>

        {token ? (
          <>
            <li className="link">
              <a
                style={{
                  color: location.pathname === "/Account" ? "black" : null,
                }}
                className="somelink"
                href="/Account"
              >
                My account
              </a>
            </li>

            <li
              style={{ cursor: "pointer" }}
              className="link"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </li>
          </>
        ) : (
          <li className="link">
            <a className="somelink" href="/login">
              Login
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
