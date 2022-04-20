import "../Styles/styles.css";
import img1 from "../Assests/img1calltoaction.jpg";
import img1up from "../Assests/img1up.jpg";
import img2 from "../Assests/img2calltoaction.jpg";
import img2up from "../Assests/img2up.jpg";
import img3 from "../Assests/img3calltoaction.jpg";
import img3up from "../Assests/img3up.jpg";
import img4 from "../Assests/img4calltoaction.jpg";
import img4up from "../Assests/img4up.jpg";
import Video from "../Assests/fondocalltoaction.mp4";
export default function CardHover() {
  return (
    <>
      <div className="calltoactionprincipal">
        <div className="divcalltoactionfather">
          <div className="flip-card-hover">
            <div className="flip-card-hover-inner">
              <div className="flip-card-hover-front">
                <img
                  className="imgcalltoaction"
                  src={img1}
                  alt="Avatar"
                  style={{ width: 300, height: 300 }}
                />
              </div>
              <div className="flip-card-hover-back">
                <img
                  className="imgcalltoaction"
                  alt="Avatar"
                  src={img1up}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
          </div>

          <div className="divhcalltoaction">
            <h2 className="titulocalltoaction">
              A good way to break the routine{" "}
            </h2>
          </div>
        </div>
        <div className="divcalltoactionfather">
          <div className="flip-card-hover">
            <div className="flip-card-hover-inner">
              <div className="flip-card-hover-front">
                <img
                  className="imgcalltoaction"
                  src={img2}
                  alt="Avatar"
                  style={{ width: 300, height: 300 }}
                />
              </div>
              <div className="flip-card-hover-back">
                <img
                  className="imgcalltoaction"
                  alt="Avatar"
                  src={img2up}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
          </div>

          <div className="divhcalltoaction">
            <h2 className="titulocalltoaction">
              It will help you to know yourself.
            </h2>
          </div>
        </div>
        <div className="divcalltoactionfather">
          <div className="flip-card-hover">
            <div className="flip-card-hover-inner">
              <div className="flip-card-hover-front">
                <img
                  className="imgcalltoaction"
                  src={img3}
                  alt="Avatar"
                  style={{ width: 300, height: 300 }}
                />
              </div>
              <div className="flip-card-hover-back">
                <img
                  className="imgcalltoaction"
                  alt="Avatar"
                  src={img3up}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
          </div>
          <div className="divhcalltoaction">
            <h2 className="titulocalltoaction">
              Open your mind to other cultures.
            </h2>
          </div>
        </div>
        <div className="divcalltoactionfather">
          <div className="flip-card-hover">
            <div className="flip-card-hover-inner">
              <div className="flip-card-hover-front">
                <img
                  className="imgcalltoaction"
                  src={img4}
                  alt="Avatar"
                  style={{ width: 300, height: 300 }}
                />
              </div>
              <div className="flip-card-hover-back">
                <img
                  className="imgcalltoaction"
                  alt="Avatar"
                  src={img4up}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
          </div>
          <div className="divhcalltoaction">
            <h2 className="titulocalltoaction">
              Simply because traveling is great.{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
