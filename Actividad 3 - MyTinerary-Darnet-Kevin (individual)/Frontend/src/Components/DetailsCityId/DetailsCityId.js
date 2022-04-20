import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import citiesActions from "../Redux/actions/citiesActions";
import itinerariesActions from "../Redux/actions/itinerariesActions";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
import "../Styles/itineraryDetails.css";
import Activities from "./Activities";
import Comments from "../Comments/Comments";
import { useSelector } from "react-redux";

const DetailsCityId = (props) => {
  /*   console.log(props);
   */ console.log(props.itineraries);
  const cambio = useSelector((state) => state.comentarioReducer.cambio);
  const [reload, setReload] = useState();
  const { city } = props;
  const { id } = useParams();

  async function likesOrDislikes(id) {
    /*     console.log(id);
     */ await props.likeDislike(id);
    setReload(!reload);
  }

  async function noUser() {
    Swal.fire({
      icon: "warning",
      title: "You have to be logged to like it",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  useEffect(() => {
    props.findOneCity(id);
    props.itinerarioPorCiudad(id);
  }, [!reload, cambio]);

  return (
    <>
      <div className="DetailsCard">
        {city._id && (
          <div className="carddetails">
            <div className="tituloItinerario">
              <h1 className="card-title">{city.city} </h1>
            </div>
            <div className="d-flex flex-column">
              {props.itineraries.length ? (
                props.itineraries.map((itinerary, index) => (
                  <div className="card2 mb-3 cardDetail2">
                    <div className="ConteinerUser">
                      <img className="imguser" src={itinerary?.userimage} />
                      <h2 className="card-user">{itinerary?.username}</h2>
                    </div>
                    <h1 className="card-title2">{itinerary?.name}</h1>
                    <div>
                      <img className="imgitinerary" src={itinerary?.image} />
                    </div>
                    <div className="card-body">
                      <p className="card-p2">
                        Description: {itinerary?.details}{" "}
                      </p>
                      <p className="card-p2">Duration: {itinerary?.duration}</p>
                      <p className="card-p2">
                        Hashtag:{" "}
                        {itinerary?.hashtag[0] + " " + itinerary?.hashtag[1]}
                      </p>
                      <p className="card-p2">
                        Price:{"💵".repeat(parseInt(itinerary.price))}
                      </p>
                      <div className="likeDislike">
                        {props?.user ? (
                          <button
                            className="buttonLike"
                            id={itinerary?._id}
                            onClick={() => likesOrDislikes(itinerary._id)}
                          >
                            {itinerary?.likes.includes(props.user.id) ? (
                              <button
                                style={{
                                  color: "red",
                                  fontSize: 30,
                                  textAlign: "center",
                                }}
                                className="material-icons"
                              >
                                favorite
                              </button>
                            ) : (
                              <span
                                style={{ fontSize: 30, color: "white" }}
                                className="material-icons"
                              >
                                favorite_border
                              </span>
                            )}
                          </button>
                        ) : (
                          <span
                            onClick={noUser}
                            style={{
                              fontSize: 30,
                              color: "white",
                            }}
                            className="material-icons"
                          >
                            favorite_border
                          </span>
                        )}
                        <h3
                          style={{
                            color: "white",
                            fontSize: 30,
                            marginLeft: "0.5rem",
                            textAlign: "center",
                          }}
                        >
                          {itinerary?.likes.length}
                        </h3>
                      </div>
                    </div>
                    <div className="accordion" id={itinerary?.name}>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"heading" + itinerary?.name}
                        ></h2>
                        <div
                          id={itinerary?.name.replace(/ /g, "").slice(0, 5)}
                          className="accordion-collapse collapse "
                          aria-labelledby={"heading" + itinerary?.name}
                          data-bs-parent={"#" + itinerary?.name}
                        ></div>
                      </div>
                    </div>
                    <div className="accordion" id={itinerary?.name}>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"heading" + itinerary?.name}
                        >
                          <button
                            className="accordion-button collapsed acordion "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#" +
                              itinerary?.name.replace(/ /g, "").slice(0, 5)
                            }
                            aria-expanded="false"
                            aria-controls={itinerary?.name
                              .replace(/ /g, "")
                              .slice(0, 5)}
                          >
                            Activities
                            <span
                              className="material-icons ml-auto arrow2 collapsed "
                              data-bs-toggle="collapse"
                              aria-controls={itinerary?.name
                                .replace(/ /g, "")
                                .slice(0, 5)}
                              data-bs-target={
                                "#" +
                                itinerary?.name.replace(/ /g, "").slice(0, 5)
                              }
                            >
                              keyboard_arrow_down
                            </span>
                          </button>
                        </h2>
                        <div
                          id={itinerary?.name.replace(/ /g, "").slice(0, 5)}
                          className="accordion-collapse collapse"
                          aria-labelledby={"heading" + itinerary?.name}
                          data-bs-parent={"#" + itinerary?.name}
                        >
                          <div className="activitiesDetail accordion-body">
                            <Activities id={itinerary._id} />

                            <Comments
                              user={props.user}
                              itineraryID={itinerary._id}
                              comments={itinerary.comments}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="notCities">
                  <h3 className="card-title2">
                    WE COULD NOT FIND ANY ITINERARY FOR THIS CITY
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />;
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    city: state.Data.city,
    itineraries: state.itinerariesReducers.itineraries,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  findOneCity: citiesActions.findOneCity,
  itinerarioPorCiudad: itinerariesActions.itinerarioPorCiudad,
  likeDislike: itinerariesActions.likeDislike,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsCityId);
