import React, { useEffect, useRef } from "react";
import "./App.scss";
import { TimelineLite, TweenMax, Power3 } from "gsap";

import img1 from "./images/place4.jpg";
import img2 from "./images/place5.jpg";
import img3 from "./images/place6.jpg";
import arrow from "./images/arrow-right.svg";
import { useHistory } from "react-router-dom";

function Landing() {
  let app = useRef(null);
  let images = useRef(null);
  let content = useRef(null);
  let tl = new TimelineLite({ delay: 0.8 });
  const history = useHistory();
  function clickNavigate() {
    history.push("/home");
  }

  useEffect(() => {
    // Images Vars
    const image1 = images.children[0];
    const image2 = images.children[1];
    const image3 = images.children[2];

    //content vars
    const headlineFirst = content.children[0].children[0];
    const headlineSecond = headlineFirst.nextSibling;
    const headlineThird = headlineSecond.nextSibling;
    const contentP = content.children[1];
    const contentButton = content.children[2];

    //Remove initial flash
    TweenMax.to(app, 0, { css: { visibility: "visible" } });

    //Images Animation
    tl.from(image1, 1.2, { y: 1000, ease: Power3.easeOut }, "Start")
      .from(image1.firstElementChild, 2, { scale: 1.3, ease: Power3.easeOut }, 0.2)
      .from(image2, 1.2, { y: 900, ease: Power3.easeOut }, 1.3)
      .from(image2.firstElementChild, 2, { scale: 1.3, ease: Power3.easeOut }, 1.5)
      .from(image3, 1.3, { y: 900, ease: Power3.easeOut }, 2.6)
      .from(image3.firstElementChild, 2, { scale: 1.3, ease: Power3.easeOut }, 2.86);

    //Content Animation
    tl.staggerFrom(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      1.2,
      {
        y: 44,
        ease: Power3.easeOut,
        delay: 0,
      },
      1.5,
      "Start"
    )
      .from(contentP, 1.4, { y: 20, opacity: 0, ease: Power3.easeOut }, 4.6)
      .from(contentButton, 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 6.2);
  }, [tl]);

  return (
    <div className="hero" ref={(el) => (app = el)}>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-content-inner" ref={(el) => (content = el)}>
              <h1>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">Continue Discovering</div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">While Knowing The Facts</div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">Travel.Tips</div>
                </div>
              </h1>
              <p>
                Welcome to Travel.Tips! The site where you can read usefull short tips. And if you
                have a tip feel free to make an account and post it. Seen a tip that absolutely blew
                your mind. Why not give it a like? By doing so, usefull tips stand out more!
              </p>
              <div className="btn-row">
                <button className="explore-button">
                  Explore
                  <div className="arrow-icon">
                    <img src={arrow} alt="row" onClick={clickNavigate} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-images">
            <div ref={(el) => (images = el)} className="hero-images-inner">
              <div className="hero-image place1">
                <img src={img1} alt="pic1" />
              </div>
              <div className="hero-image place2">
                <img src={img2} alt="pic2" />
              </div>
              <div className="hero-image place3">
                <img src={img3} alt="pic3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
