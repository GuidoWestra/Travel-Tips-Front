import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { CLOUDINARY_URL } from "../../config/constants";
import { updateUser } from "../../store/user/actions";
import { useDispatch } from "react-redux";

export default function EditPicture() {
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [photoLink, setPhotoLink] = useState("");

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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  function submitImage(event) {
    event.preventDefault();
    uploadImage(fileInput);
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInput(file);
  };

  const dispatch = useDispatch();

  function persistImage(event) {
    event.preventDefault();
    dispatch(updateUser(photoLink));
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <Form.Group>
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
        <div style={{ padding: "10px" }}>
          {preview && !photoLink ? (
            <Button variant="dark" type="submit" onClick={submitImage}>
              Choose this picture
            </Button>
          ) : null}
          {photoLink ? (
            <Button variant="success" type="submit" onClick={persistImage}>
              Save Change
            </Button>
          ) : null}
        </div>
      </Form>
    </Container>
  );
}
