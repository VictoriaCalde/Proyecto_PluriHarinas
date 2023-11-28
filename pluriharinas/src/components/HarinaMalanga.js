import React from "react";
import "./Harinas.css";
import BotonCarrito from "./CarritoCompra";
import { Link } from "react-router-dom";

const HarinaMalanga = () => {
  return (
    <div>
      <ul className="harina-ul">
        <li>
          <h1 className="harina-h1">Pluri Harinas</h1>
        </li>
        <li className="harina-li">
          <Link to="/ListarProductos">Productos</Link>
        </li>
      </ul>
      <h1>Harina de Malanga</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img src="img/malanga.jpg" alt="Cosechas" />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">
            La harina de malanga tiene una consistencia muy similar a la papa,
            yuca o camote. A diferencia de estas, tiene un sabor más dulce,
            cercano al camote, con toques ligeramente parecidos a una mezcla
            entre nuez, vainilla y avellana. Debido a su versatilidad, se puede
            utilizar tanto en recetas saladas como dulces.
          </p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: ₡2,000 colones</p>
          <br />
          <BotonCarrito
            producto={{ precio: 2000, detalle: "Harina de malanga" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HarinaMalanga;
