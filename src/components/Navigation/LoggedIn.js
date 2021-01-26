import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import NavbarItem from "./NavbarItem";
import { selectUser } from "../../store/user/selectors";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <NavbarItem path="/Account" linkText="My account" />
      {/* <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item> */}
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
