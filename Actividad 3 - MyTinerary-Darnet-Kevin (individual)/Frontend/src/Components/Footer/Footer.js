import React from "react";
import "../Styles/styles.css";
import { Link as LinkRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="footer">
        <div className="btnfooter">
          <a href="https://www.facebook.com/" target="_blank">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Facebook</span>
            </button>
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Instagram</span>
            </button>
          </a>
        </div>

        <div className="btnfooter">
          <LinkRouter to="/Home" className="linkresp">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Home</span>
            </button>
          </LinkRouter>

          <LinkRouter to="/Cities" className="linkresp">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Cities</span>
            </button>
          </LinkRouter>
        </div>
      </div>
      <div className="copyrigthfooter">
        <h3 className="hfooter">
          Copyright © Kevin Darnet | Mytinerary | 2022
        </h3>
      </div>
    </>
  );
}
