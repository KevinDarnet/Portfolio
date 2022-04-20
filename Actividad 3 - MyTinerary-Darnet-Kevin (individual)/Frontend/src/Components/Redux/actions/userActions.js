import axios from "axios";

const userActions = {
  signUpUser: (userData) => {
    return async (dispatch, getState) => {
      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        userData,
      });
/*       console.log(res.data);
 */      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
    };
  },
  signInUser: (loggedUser) => {
/*     console.log(loggedUser);
 */    return async (dispatch, getState) => {
      const user = await axios.post("http://localhost:4000/api/auth/login", {
        loggedUser,
      });
/*       console.log(user);
 */      if (user.data.success) {
        localStorage.setItem("token", user.data.response.token);
/*         console.log(user.data.success);
 */        dispatch({ type: "user", payload: user.data.response.userData });
      }
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: user.data.message,
          success: user.data.success,
        },
      });
    };
  },
  SignOutUser: (closeuser) => {
    return async (dispatch, getState) => {
      /* const user = axios.post("http://localhost:4000/api/auth/signout", {
        closeuser,
      }); */
      localStorage.removeItem("token");
      dispatch({ type: "user", payload: null });
    };
  },
  verificarToken: (token) => {
    return async (dispatch, getState) => {
/*       console.log(token);
 */      const user = await axios.get(
        "http://localhost:4000/api/auth/signInToken",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
/*       console.log(user);
 */
      if (user.data.success) {
        dispatch({ type: "user", payload: user.data.response });
        dispatch({
          type: "message",
          payload: {
            view: true,
            message: user.data.message,
            success: user.data.success,
          },
        });
      } else {
        localStorage.removeItem("token");
      }
    };
  },
};
export default userActions;
