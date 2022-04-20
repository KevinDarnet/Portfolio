import { ITINERARIES_GET } from "../actions/types";

const initialState = {
  itineraries: [],
  aux: [],
  activitiesPerItinerary: [],
};

const itinerariesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITINERARIES_GET:
      return {
        ...state,
        itineraries: action.payload,
      };
      case "oneItineraryAndActivities":
      return {
        ...state,
        activitiesPerItinerary: action.payload,
      }
    default:
      return state;
  } 
};

export default itinerariesReducers;
