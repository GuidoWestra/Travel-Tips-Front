import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPlaces } from "../../store/places/selectors";

export default function CarouSel() {
  const places = useSelector(selectPlaces);
  if (places)
    return (
      <div>
        <Carousel
          style={{
            marginLeft: "20%",
            width: "60%",
          }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="https://7wallpapers.net/wp-content/uploads/1_Paris.jpg"
              alt="First slide"
            />
            {/* <Carousel.Caption> */}
            <h3>{places[0].name}</h3>
            <p>{places[0].description}</p>
            {/* </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="https://7wallpapers.net/wp-content/uploads/16_Paris.jpg"
              alt="Third slide"
            />
            {/* <Carousel.Caption> */}
            <h3>{places[1].name} </h3>
            <p>{places[1].description}</p>
            {/* </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="https://7wallpapers.net/wp-content/uploads/4_Atlantic-City.jpg"
              alt="Third slide"
            />
            {/* <Carousel.Caption> */}
            <h3>{places[2].name}</h3>
            <p>{places[1].description}</p>
            {/* </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>
    );
  else return null;
}
