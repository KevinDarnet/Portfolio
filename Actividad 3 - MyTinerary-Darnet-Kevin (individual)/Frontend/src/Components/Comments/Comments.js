import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import comentarioReducer, {
  cargarComentario,
  actualizarComentario,
  eliminarComentario,
} from "../Redux/actions/comentarioActions";
import "../Styles/comentarios.css";

const Comentarios = (props) => {
  console.log(props);

  const dispatch = useDispatch();
  //usa los reducer desde un store
  const usuario = props.user;
  const cambio = useSelector((state) => state.comentarioReducer.cambio);
  console.log(cambio);
  const [modificar, setModificar] = useState();
  const [modify, setModify] = useState(true);
  const [textAreaModify, setTextAreaModify] = useState(true);
  const [inputText, setInputText] = useState();

  async function cargarUnComentario(event) {
    const comentarioUsuario = {
      itineraryID: props.itineraryID,
      comments: inputText,
    };

    await dispatch(cargarComentario(comentarioUsuario, cambio)).then(
      (res) => console.log(res),
      setInputText("")
    );
  }
  function textAreaModifcar() {
    setTextAreaModify(!textAreaModify);
  }
  function onKeyPress(event) {
    if (event.key === "Enter") {
      modificarComentario(event);
      setTextAreaModify(!textAreaModify);
    }
  }

  async function modificarComentario(event) {
    const comentarioUsuario = {
      _id: event.target.id,
      comments: modificar,
    };
    await dispatch(actualizarComentario(comentarioUsuario, cambio)).then(
      (res) => console.log(res)
    );
    setTextAreaModify(!textAreaModify);
  }
  async function matarComentario(event) {
    dispatch(eliminarComentario(event.target.id, cambio)).then((res) => res);
  }
  function modifyComent() {
    setModify(!modify);
  }

  return (
    <div className="comentarios">
      {typeof props?.comments !== "undefined" ? (
        props?.comments?.map((comment, index) => {
          if (comment?.userID?._id !== usuario?.id) {
            return (
              <div className="card3 cardComments" key={index}>
                <div className="ConteinerUsercomment" key={index}>
                  <img className="imguser2" src={comment?.userID?.picture} />
                  <h2 className="textName">{comment?.userID?.fullName}</h2>
                  <p className="text">{comment?.comment}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="card3 cardComments" key={index}>
                <div className="ConteinerUsercomment">
                  <img className="imguser2" src={comment?.userID?.picture} />
                  <h2 className="textName">{comment?.userID?.fullName}</h2>
                  <p className="text">{comment.comment}</p>

                  {!modify ? (
                    <>
                      <button
                        className="btn btn-primary"
                        id={comment._id}
                        onClick={textAreaModifcar}
                      >
                        Modify
                      </button>
                      <button
                        className="btn btn-primary"
                        id={comment._id}
                        onClick={matarComentario}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button className="textName" onClick={modifyComent}>
                      ...
                    </button>
                  )}
                </div>
                {!textAreaModify ? (
                  <div className="ConteinerUsercomment">
                    <input
                      className="cardmodificable"
                      type="text"
                      onChange={(event) => setModificar(event.target.value)}
                      onKeyPress={onKeyPress}
                      defaultValue={comment.comment}
                      id={comment._id}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          }
        })
      ) : (
        <p>Add your comment</p>
      )}
      {usuario ? (
        <div className="card3 cardComments">
          <div className="card-header">
            <h2 className="text2">Add commnet</h2>
          </div>
          <div className="card-body">
            <input
              onChange={(event) => setInputText(event.target.value)}
              className="card-text textComments"
              value={inputText}
            />
            <button onClick={cargarUnComentario} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      ) : (
        <div className="ConteinerUsercomment">
          <h3 className="text2">Sign up to comment ...</h3>
        </div>
      )}
    </div>
  );
};

export default Comentarios;
