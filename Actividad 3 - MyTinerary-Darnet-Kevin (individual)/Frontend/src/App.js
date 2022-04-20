import "./Components/Styles/App.css";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Cities from "./Components/Cities/Cities";
import ScrollToTop from "./Components/Scrolltotop/Scrolltotop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsCityId from "./Components/DetailsCityId/DetailsCityId";
import LogIn from "./Components/SignUp/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { useEffect } from "react";
import { connect } from "react-redux";
import userActions from "./Components/Redux/actions/userActions";
import Snackbar from "./Components/SignUp/Snackbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App(props) {
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      props.VerificarToken(token);
    }
  }, []);
  function SignOut() {
    props.SignOutUser(props.user.email);
  }
  /*   console.log(SignOut);
   */ return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Snackbar />

      <Routes>
        {props.user ? (
          <>
            <Route path="/Details/:id" element={<DetailsCityId />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/Cities" element={<Cities />} />
          </>
        ) : (
          <>
            <Route path="/Details/:id" element={<DetailsCityId />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/Cities" element={<Cities />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = {
  VerificarToken: userActions.verificarToken,
  SignOutUser: userActions.SignOutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
