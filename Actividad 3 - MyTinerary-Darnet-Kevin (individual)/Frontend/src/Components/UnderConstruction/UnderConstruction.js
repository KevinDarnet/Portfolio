import React from "react";
import imgConstruction from "../Assests/imgunderconstruction.png";

export default function UnderConstruction() {
  return (
    <div className="divUnderConstruction">
      <div className="contTituloConstruction">
        <h1 className="titulocities">There are no itineraries</h1>
      </div>
      <img className="imgConstruction" src={imgConstruction} />
    </div>
  );
}
