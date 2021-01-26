import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
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
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group>
          <label class="form-label" for="customFile">
            Upload Image
          </label>
          <br />
          <input
            type="file"
            class="form-control"
            id="customFile"
            label="Example file input"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            className="from-input"
          />
        </Form.Group>
        <div>
          {preview && (
            <img src={preview} alt="chosen" style={{ height: "300px" }}></img>
          )}
        </div>
        <br />
        {preview ? (
          <Button variant="dark" type="submit" onClick={submitImage}>
            Choose this picture
          </Button>
        ) : null}

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
