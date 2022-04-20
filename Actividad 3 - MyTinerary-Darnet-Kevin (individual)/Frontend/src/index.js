import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./Components/Redux/reducers/mainReducer";

const reduxStore = createStore(mainReducer, applyMiddleware(thunk));
ReactDOM.render(
  <>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
