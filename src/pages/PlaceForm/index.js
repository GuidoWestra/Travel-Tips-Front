import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLOUDINARY_URL } from "../../config/constants";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { postPlace } from "../../store/places/actions";
import { selectToken } from "../../store/user/selectors";
import { selectPlace } from "../../store/places/selectors";

export default function PlaceForm() {
  const [placeName, set_placeName] = useState("");
  const [placeDescription, set_placeDescription] = useState("");
  const [placeCity, set_placeCity] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [uploadLoading, setUploadLoading] = useState("");
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const newPlace = useSelector(selectPlace);

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
    setUploadLoading("Loading...");
  }

  function submitPlace(event) {
    event.preventDefault();
    if (!placeName || !placeDescription || !placeCity)
      return dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          "Please provide a name, city and description"
        )
      );
    dispatch(postPlace(placeName, placeDescription, placeCity, photoLink));
  }

  useEffect(() => {
    if (token === null) {

      dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          "Please login to create new places!"
        )
      );
      history.push("/login");

    }
    if (newPlace) history.push(`/details/${newPlace.id}`);
    console.log(`i am inside of a component`, newPlace);
  }, [token, history, newPlace, dispatch]);
  return (
    <div
      style={{
        mindWidth: "40%",
        maxWidth: "40%",
        marginLeft: "30%",
        marginTop: "5%",
      }}
    >
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="placeName"
            placeholder="Enter place name"
            value={placeName}
            onChange={(event) => set_placeName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="placeDescription"
            as="textarea"
            rows={4}
            placeholder="Enter place description"
            value={placeDescription}
            onChange={(event) => set_placeDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="placeCity"
            placeholder="Enter a city"
            value={placeCity}
            onChange={(event) => set_placeCity(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <label className="form-label" htmlFor="customFile">
            Upload Image
          </label>
          <br />
          <input
            type="file"
            id="customFile"
            label="Example file input"
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

        {preview && !photoLink ? (
          <>
            {uploadLoading ? (
              <Spinner
                style={{ marginTop: "5px", marginBottom: "25px" }}
                animation="border"
                variant="dark"
              />
            ) : (
              <>
                <Button
                  style={{
                    marginBottom: "25px",
                  }}
                  variant="dark"
                  type="submit"
                  onClick={submitImage}
                >
                  Choose photo
                </Button>
              </>
            )}
          </>
        ) : null}
        {preview && !photoLink ? null : (
          <Button
            onClick={submitPlace}
            style={{ marginTop: "0px", marginBottom: "25px" }}
            variant="dark"
            type="submit"
          >
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}
