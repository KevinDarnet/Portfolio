import "../Styles/styles.css";
import React from "react";
import { connect } from "react-redux";
import userActions from "../Redux/actions/userActions";
import { Link as LinkRouter } from "react-router-dom";
import Container from "./datoLog";
import Snackbar from "./Snackbar";
import FacebookSignIn from "./FacebookSignIn";

function SignIn(props) {
  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2].value);

    const loggedUser = {
      email: event.target[1].value,
      password: event.target[2].value,
      from: "form-Signup",
    };
    props.signInUser(loggedUser);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container />
        <Snackbar />
        <FacebookSignIn />

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
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block btnform">
            SignIn
          </button>
        </div>
        <div className="text-center">
          <h3 className="title mt-3 text-center">Dont Have an account?</h3>

          <LinkRouter className="btnform" to="/signup">
            SignUp
          </LinkRouter>
        </div>
      </form>
    </>
  );
}

const mapDispatchToProps = {
  signInUser: userActions.signInUser,
};

export default connect(null, mapDispatchToProps)(SignIn);
