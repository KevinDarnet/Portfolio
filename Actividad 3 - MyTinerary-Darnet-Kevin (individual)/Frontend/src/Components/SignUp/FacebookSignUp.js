import React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import userActions from "../Redux/actions/userActions";
import "./styleSign.css";

function FacebookSignUp(props) {
  const responseFacebook = async (res) => {
    console.log(res);
    console.log(res.name);

    const userData = {
      fullName: res.name,
      email: res.email,
      password: res.id,
      picture: res.picture.data.url,
      country: props.country,
      from: "facebook",
    };
    await props.signUpUser(userData);
  };

  return (
    <FacebookLogin
      cssClass="buttonsocial my-facebook-button-class"
      icon="fa-facebook"
      textButton=" SignUp with Facebook"
      appId="3004491136510685"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}
const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(FacebookSignUp);
