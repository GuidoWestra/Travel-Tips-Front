import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

import "./index.css";
import EditPicture from "./EditPicture";

export default function Account() {
  const [editMode, setEditMode] = useState(false);
  const user = useSelector(selectUser);
  console.log("User on Account Page!", user);

  useEffect(() => {
    console.log("Render");
  }, []);

  const onClickEditPhoto = () => {
    if (editMode === false) {
      setEditMode(true);
    }
    if (editMode === true) {
      setEditMode(false);
    }
  };

  return (
    <Container style={{ marginTop: "32px", padding: "64px" }}>
      <div class="bg-white shadow rounded overflow-hidden">
        <div class="px-4 pt-0 pb-4 bg-dark">
          <div class="media align-items-end profile-header">
            <div class="profile mr-3">
              <img
                src={user.photo}
                alt="profile picture"
                width="230"
                height="200"
                class="rounded mb-2 img-thumbnail"
              />
              <Button
                className="btn btn-dark btn-sm btn-block"
                onClick={onClickEditPhoto}
              >
                {editMode ? "Exit Edit" : "Edit picture"}
              </Button>
            </div>

            <div class="media-body mb-5 text-white">
              <h4 class="mt-0 mb-0">{user.name}</h4>

              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div class="bg-light p-4 d-flex justify-content-end text-center">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">3</h5>
              <small class="text-muted">
                {" "}
                <i class="fa fa-user-circle-o mr-1"></i>Tips
              </small>
            </li>
          </ul>
        </div>
        <div className="media align-items-end">
          {editMode ? <EditPicture /> : false}
        </div>
      </div>
      <div class="py-4">
        <h5 class="mb-3">Recent Tips</h5>
        <div class="p-4 bg-light rounded shadow-sm mb-3">
          <p class="font-italic mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <ul class="list-inline small text-muted mt-3 mb-0">
            <li class="list-inline-item">
              <i class="fa fa-heart-o mr-2"></i>X Likes
            </li>
          </ul>
        </div>
        <div class="p-4 bg-light rounded shadow-sm mb-3">
          <p class="font-italic mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <ul class="list-inline small text-muted mt-3 mb-0">
            <li class="list-inline-item">
              <i class="fa fa-heart-o mr-2"></i>X Likes
            </li>
          </ul>
        </div>
        <div class="p-4 bg-light rounded shadow-sm">
          <p class="font-italic mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <ul class="list-inline small text-muted mt-3 mb-0">
            <li class="list-inline-item">
              <i class="fa fa-heart-o mr-2"></i>X Likes
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
