import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Button from "react-bootstrap/Button";
import Tip from "../../components/Tip/tip";
import { fetchTipsForUser } from "../../store/tips/actions";
import { selectTipsForPlace } from "../../store/tips/selectors";
import Modal from "react-bootstrap/Modal";

import "./index.css";
import EditPicture from "./EditPicture";

export default function Account() {
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTipsForUser());
  }, [dispatch]);

  const tips = useSelector(selectTipsForPlace);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const profilePictureCheck = !user.photo
    ? "http://res.cloudinary.com/dxtq8ajzg/image/upload/v1611749197/unqla8crrv5lzffchfnr.png"
    : user.photo;

  return (
    <div className="pageContainer">
      <div>
        <div class="bg-white shadow rounded overflow-hidden">
          <div class="px-4 pt-0 pb-4 bg-dark">
            <div class="media align-items-end profile-header">
              <div class="profile mr-3">
                <img
                  src={profilePictureCheck}
                  alt="profile pic"
                  width="230"
                  height="200"
                  class="rounded mb-2 img-thumbnail"
                />
                <Button
                  className="btn btn-dark btn-sm btn-block"
                  onClick={handleShow}
                >
                  Edit Picture
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  autoFocus
                  animation
                  size="lg"
                  shadow
                  rounded
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Upload New Picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditPicture />
                  </Modal.Body>
                </Modal>
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
                <h5 class="font-weight-bold mb-0 d-block">
                  {tips ? tips.length : "0"}
                </h5>
                <small class="text-muted">
                  {" "}
                  <i class="fa fa-user-circle-o mr-1"></i>Tips
                </small>
              </li>
            </ul>
          </div>
        </div>
        <div class="py-4">
          <h5 class="mb-3">Recent Tips</h5>
          <Tip data={tips} />
        </div>
      </div>
    </div>
  );
}
