const initialState = {
  cities: [],
  city: {},
  citiesFilter: [],
};

const citiesReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        cities: action.send,
        citiesFilter: action.send,
        citiesAux: action.send,
      };
    case "fetchOne":
      return {
        ...state,
        city: action.send,
      };
    case "delete":
      return {
        ...state,
        cities: action.send,
      };
    case "chargeCities":
      let cities = [...state.cities];
      cities.push(action.send);
      return {
        ...state,
        cities,
        aux: [...cities],
      };

    case "filtro":
      const filtrado = action.send.cities.filter((data) =>
        data.city
          .toLowerCase()
          .startsWith(action.send.value.toLowerCase().trim())
      );
      return {
        ...state,
        citiesFilter: filtrado,
      };

    default:
      return state;
  }
};
export default citiesReducer;
