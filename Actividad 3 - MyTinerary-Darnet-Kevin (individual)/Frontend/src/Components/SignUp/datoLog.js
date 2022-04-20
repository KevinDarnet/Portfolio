import React from "react";
import { connect } from "react-redux";
import userActions from "../Redux/actions/userActions";

function Container(props) {
  function SignOut() {
    props.SignOutUser(props.user.email);
  }

  return (
    <>
      {props.user ? (
        <>
          <h2>{props.user.fullName}, you're connected. </h2>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <button
              onClick={SignOut}
              className="btn btn-primary btn-block btnformout"
              style={{ maxWidth: 400 }}
            >
              SignOut
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Offline user</h1>
          <h4 className="title mt-3 text-center">Please login</h4>
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = {
  SignOutUser: userActions.SignOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
