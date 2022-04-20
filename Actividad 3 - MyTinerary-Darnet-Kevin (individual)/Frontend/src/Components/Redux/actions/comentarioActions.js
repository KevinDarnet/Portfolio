import axios from "axios";

const dataInicial = {
  cambio: false,
};
export default function comentarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case MENSAJE_CARGADO:
      return {
        ...state,
        cambio: action.payload,
      };
    default:
      return state;
  }
}
const MENSAJE_CARGADO = "fetchAddComments";

export const cargarComentario =
  (comentario, unCambio) => async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    console.log(comentario);
    const res = await axios.post(
      "http://localhost:4000/api/itineraries/comment",
      { comentario },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "fetchAddComments", payload: !unCambio });
    return res;
  };
export const actualizarComentario =
  (comentario, unCambio) => async (dispatch, getState) => {
    // console.log(comentario)
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:4000/api/itineraries/comment/modify",
      { comentario },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MENSAJE_CARGADO, payload: !unCambio });
    return res;
  };

export const eliminarComentario =
  (id, unCambio) => async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:4000/api/itineraries/comment/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MENSAJE_CARGADO, payload: !unCambio });
    return res;
  };
