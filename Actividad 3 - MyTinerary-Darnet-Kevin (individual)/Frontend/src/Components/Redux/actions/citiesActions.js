import axios from "axios";

const citiesActions = {
  fetchearCities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/allcities");
/*       console.log(res);
 */      dispatch({ type: "fetch", send: res.data.response.ciudades });
    };
  },
  findOneCity: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/allcities/" + id);

      dispatch({ type: "fetchOne", send: res.data.respuesta });
      //console.log(res);
    };
  },
  deleteCities: (id) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.delete(
          "http://localhost:4000/api/allcities/" + id
        );
        dispatch({ type: "delete", send: res.data.response.ciudades });
      } catch (err) {
        console.log(err);
      }
    };
  },
  filterCity: (cities, value) => {
    return (dispatch, getState) => {
      dispatch({ type: "filtro", send: { cities, value } });
    };
  },
  chargeCities: (name, ciudad) => {
    return async (dispatch, getState) => {
      const res = await axios.post("http://localhost:4000/api/allcities", {
        name,
        ciudad,
      });
      dispatch({ type: "chargeCities", send: res.data.response.ciudades });
    };
  },
};
export default citiesActions;
