import { combineReducers } from "redux";
import citiesReducer from "./citiesReducers";
import itinerariesReducers from "./itinerariesReducers";
import userReducer from "./userReducer";
import activitiesReducer from "./activitiesReducer";
import comentarioReducer from "../actions/comentarioActions";

const mainReducer = combineReducers({
  Data: citiesReducer,
  itinerariesReducers,
  userReducer,
  activitiesReducer,
  comentarioReducer,
});

export default mainReducer;
