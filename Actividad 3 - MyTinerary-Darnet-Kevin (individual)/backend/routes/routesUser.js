const Router = require("express").Router();
const validator = require("../config/validator");
const passport = require("../config/passport");

const usersControllers = require("../controllers/userControllers");
const { signUpUsers, signInUser, signOutUser, verifyEmail, verificarToken } =
  usersControllers;

Router.route("/auth/signup").post(validator, signUpUsers);

Router.route("/auth/login").post(signInUser);

Router.route("/auth/signout").post(signOutUser);
Router.route("/verify/:uniqueString") //RECIBE EL LINK DE USUARIO
  .get(verifyEmail); //LLAMA A FUNCION DE VERIFICACIION
Router.route("/auth/signInToken").get(
  passport.authenticate("jwt", { session: false }),
  verificarToken
);
module.exports = Router;
