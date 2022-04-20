import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../Redux/actions/userActions";
import { Link as LinkRouter } from "react-router-dom";
import Snackbar from "./Snackbar";
import FacebookSignUp from "./FacebookSignUp";
import countryImg from "../../Components/Assests/countries.png";

function SignUp(props) {
  const paises = [
    "unselected",
    "Argentina",
    "Brazil",
    "Colombia",
    "Chile",
    "Uruguay",
    "Venezuela",
    "Paraguay",
    "Perú",
    "México",
  ];

  const [selectPaises, setSelectPaises] = useState("unselected");

  function select(event) {
    console.log(event.target.value);
    setSelectPaises(event.target.value);
  }

  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2].value);
    console.log(event.target[3].value);
    console.log(event.target[4].value);

    const userData = {
      fullName: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value,
      country: selectPaises,
      picture: event.target[4].value,
      from: "form-Signup",
    };
    props.signUpUser(userData);
  };

  return (
    <>
      <div className="styleselect">
        <div className="divunselected">
          <h1 className="title mt-3 text-center textselect">
            Your country is:
          </h1>
          <select
            className="Selectcountry form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={select}
          >
            {paises.map((country, index) => (
              <option key={index}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      {selectPaises !== "unselected" ? (
        <form onSubmit={handleSubmit}>
          <FacebookSignUp country={selectPaises} />
          <Snackbar />
          <div>
            <div>
              <h1 className="title">Register</h1>
              <h4 className="title mt-3 text-center">
                Get started with your free account
              </h4>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                name="fullName"
                className="form-control"
                placeholder="Full name"
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="Email address"
                type="email"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                name="password"
                className="form-control"
                placeholder="Create password"
                type="password"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-image"></i>
                </span>
              </div>
              <input
                name="Picture"
                className="form-control"
                placeholder="Photo"
              />
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block btnform">
              Create Account
            </button>
          </div>
          <div className="text-center divtitleform">
            <h4 className="title mt-3 text-center">Have an account? </h4>

            <LinkRouter className="btnform" to="/login">
              SignIn
            </LinkRouter>
          </div>
        </form>
      ) : (
        <div className="selectcountry">
          <div>
            <h2 className="title mt-3 text-center textselect">
              Select your country to register
            </h2>
          </div>
          <div className="titleSignIn">
            <h3>You have an account?</h3>
            <LinkRouter className="btnform" to="/login">
              SignIn
            </LinkRouter>
          </div>
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
};
const mapStateToProps = (state) => {
  return {
    message: state.userReducer.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
