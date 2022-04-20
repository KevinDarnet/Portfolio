const initialState = {
  cambio: false,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchAddComments":
      return {
        ...state,
        cambio: action.payload,
      };
    default:
      return state;
  }
};
export default commentsReducer;
