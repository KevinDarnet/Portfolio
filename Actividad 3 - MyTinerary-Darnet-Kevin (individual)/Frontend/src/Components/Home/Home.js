import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "../Styles/styles.css";
import Carousel from "../Carousel/Carousel";
import { Link as LinkRouter } from "react-router-dom";
import Calltoaction from "../Calltoaction/Calltoaction";
import Footer from "../Footer/Footer";
import Logomytinerary from "../Assests/Logomytinerary.png";
import VideoHome from "../Assests/videohome.mp4";

export default function App() {
  return (
    <>
      <div className="video">
        <video
          loop
          autoPlay
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "75%",
            objectFit: "cover",
            transform: "translate (-50%, -50%)",
            zInedx: "-10",
          }}
        >
          <source src={VideoHome} type="video/mp4" />
        </video>
      </div>
      <div className="conteinerHeader">
        <div className="conteinerlogoinheader">
          <img className="logoinheader" src={Logomytinerary} />
        </div>
        <div className="conteinertitlogo">
          <h2 className="tituloheader">
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </h2>

          <div className="buttoncitties">
            <LinkRouter to="/Cities" className="linkresp">
              <button className="btnhome">Travel</button>
            </LinkRouter>
          </div>
        </div>
      </div>
      <div className="divcalltoaction">
        <Calltoaction />
      </div>
      <div className="conteinerCarousel">
        <Carousel />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
