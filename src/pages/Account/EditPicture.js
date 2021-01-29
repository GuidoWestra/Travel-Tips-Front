import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Col } from "react-bootstrap";
import { CLOUDINARY_URL } from "../../config/constants";
import { updateUser } from "../../store/user/actions";
import { useDispatch } from "react-redux";
import "./AccountIndex.scss";

export default function EditPicture() {
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [uploadLoading, setUploadLoading] = useState("");

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
    setUploadLoading("Loading...");
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
    <div>
      <div className="upload-container">
        <Form as={Col} className="uploadForm">
          <input
            type="file"
            id="customFile"
            name="image"
            onChange={handleFileInputChange}
            className="from-input"
          />

          <Form.Group as={Col} className="uploadForm">
            {preview && (
              <img
                src={preview}
                alt="chosen"
                style={{ height: "300px" }}
                className="preview-image-avatar"
              ></img>
            )}
          </Form.Group>

          <Form.Group as={Col} className="uploadForm">
            {preview && !photoLink ? (
              <>
                {uploadLoading ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  <>
                    <Button variant="dark" type="submit" onClick={submitImage}>
                      Choose photo
                    </Button>
                  </>
                )}
              </>
            ) : null}
            {photoLink ? (
              <Button variant="success" type="submit" onClick={persistImage}>
                Save Change
              </Button>
            ) : null}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
