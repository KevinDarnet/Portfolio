const initialState = {
  activities: [],
  oneActivityPerItinerary: [],
};

const activitiesReducer = (state = initialState, action) => {
  /*   console.log(action);
   */ switch (action.type) {
    case "fetchActivities":
      return {
        ...state,
        activities: action.payload,
      };
    case "fetchOneActivtyPerCity":
      return {
        ...state,
        oneActivityPerItinerary: action.send,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
