import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import MessageBox from "../../components/MessageBox/index";
import { Row, Col } from "react-bootstrap";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { CLOUDINARY_URL } from "../../config/constants";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const handleFileInputChange = (e) => {
    setPhotoLink("");
    const file = e.target.files[0];
    previewFile(file);
    setFileInput(file);
  };

  const uploadImage = async (fileInput) => {
    try {
      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("upload_preset", "r2hzqmfa");
      const resp = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const body = await resp.json();
      console.log("response from upload", body.url);
      setPhotoLink(body.url);
      return body.url;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  function submitImage(event) {
    event.preventDefault();
    uploadImage(fileInput);
  }

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password, photoLink));

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <div className="form-container sign-up-container">
      <MessageBox />
      <Form
        action="#"
        style={{
          //don't change!!!!!!!!!
          marginTop: "45px",
          marginLeft: "85px",
          marginRight: "85px",
          textAlign: "center",
        }}
      >
        <h2 className="form-title">Hello, Friend!</h2>
        <Form.Group controlId="formBasicName">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Row style={{ marginTop: "20px" }}>
          <Col style={{ textAlign: "left" }}>
            <Form.Group>
              <Form.Label htmlFor="customFile">Upload Image</Form.Label>

              <input
                style={{
                  backgroundColor: "white",
                  marginLeft: "0",
                  paddingLeft: "0",
                }}
                type="file"
                id="customFile"
                label="Example file input"
                name="image"
                onChange={handleFileInputChange}
              />
            </Form.Group>
            {preview && !photoLink ? (
              <button className="form-button-pic" type="submit" onClick={submitImage}>
                Choose this picture
              </button>
            ) : null}
          </Col>

          <Col>
            <div>
              {preview && (
                <img
                  src={preview}
                  alt="chosen"
                  style={{
                    height: "200px",
                    borderRadius: "9px",
                    marginTop: "10px",
                    boxShadow: "1px 1px 5px 1px grey",
                  }}
                ></img>
              )}
            </div>
          </Col>
        </Row>{" "}
      </Form>{" "}
      <button className="form-button-s" type="submit" onClick={submitForm}>
        Sign up
      </button>
    </div>
  );
}
