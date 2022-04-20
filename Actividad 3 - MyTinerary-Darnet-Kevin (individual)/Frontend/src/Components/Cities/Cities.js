import * as React from "react";
import Footer from "../Footer/Footer";
import Video from "../Assests/videofondo.mp4";
import NotFound from "../Assests/notfound.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import citiesActions from "../Redux/actions/citiesActions";
/* NO FUNCIONA EL FOOTER EN CITIES */

function Cities(props) {
  const [busqueda, setBusqueda] = useState(""); //cambios en el search

  const searching = (search) => {
    setBusqueda(search.target.value);
    props.filterCity(props.cities, search.target.value);
  };

  //console.log(props);

  useEffect(() => {
    props.fetchearCities();
  }, []);

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
            height: "42%",
            objectFit: "cover",
            zInedx: "-10",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div className="conteinertituloysearch">
        <h1 className="titulocities">Look for your next adventure</h1>
        <div className="inputsearch">
          <input
            className="inputsearch"
            placeholder="Search City"
            value={busqueda}
            onChange={searching}
          />
        </div>
      </div>
      <section className="conteinercard">
        {props.citiesFilter?.length !== 0 ? (
          props.citiesFilter.map((ciudad) => (
            <div className="card" key={ciudad._id}>
              <div className="conteinerimgcard">
                <img className="imgcard" src={ciudad.image} />
              </div>
              <div className="conteinertextocard">
                <h3 className="titulocard">{ciudad.city} </h3>
                <p className="descripcioncard">- Country: {ciudad.country} </p>
                <p className="descripcioncard">- Language: {ciudad.language}</p>
                <p className="descripcioncard">- Coin: {ciudad.coin} </p>
                <Link to={`/Details/${ciudad._id}`}>
                  <div className="contenedorbuttoncities">
                    <button className="btndetails">Details</button>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="conteinernotfound">
            <img className="imgnotfound" src={NotFound} />
            <h2 className="titulocities">
              I'm sorry, I can't find it. Try again.
            </h2>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cities: state.Data.cities,
    citiesFilter: state.Data.citiesFilter,
  };
};

const mapDispatchToProps = {
  fetchearCities: citiesActions.fetchearCities,
  filterCity: citiesActions.filterCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
