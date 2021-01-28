import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Tip from "../../components/Tip/tip";
import { fetchTipsForUser } from "../../store/tips/actions";
import { selectTipsForPlace } from "../../store/tips/selectors";
import Modal from "react-bootstrap/Modal";

import "./AccountIndex.scss";
import EditPicture from "./EditPicture";
import { Container } from "react-bootstrap";

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
    ? "http://res.cloudinary.com/dxtq8ajzg/image/upload/v1611843272/kgw4ws43kcf7xulierrh.png"
    : user.photo;

  return (
    <div className="page-box">
      <div className="page-container">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="profile-background">
            <div className="media align-items-end profile-header">
              <div className="profile mr-3">
                <img
                  src={profilePictureCheck}
                  alt="user profile"
                  width="230"
                  className="avatar-image"
                />

                <img
                  className="avatar-edit"
                  src="http://res.cloudinary.com/dxtq8ajzg/image/upload/v1611842718/c1usvvykbz8kgpjr6z3n.png"
                  onClick={handleShow}
                  alt="default avatar"
                />
                <Container className="justify-content-md-center">
                  <Modal
                    className="modal-fade"
                    show={show}
                    onHide={handleClose}
                    autoFocus
                    animation
                    size="lg"
                    rounded
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Upload New Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditPicture />
                    </Modal.Body>
                  </Modal>
                </Container>
              </div>

              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">{user.name}</h4>

                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {tips ? tips.length : "0"}
                </h5>
                <small className="text-muted">
                  {" "}
                  <i className="fa fa-user-circle-o mr-1"></i>Tips
                </small>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-4">
          <h5 className="mb-3">Recent Tips</h5>
          <Tip data={tips} />
        </div>
      </div>
    </div>
  );
}
