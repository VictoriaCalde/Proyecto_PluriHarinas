import React from "react";
import "./Harinas.css";
import BotonCarrito from "./CarritoCompra";
import { Link } from "react-router-dom";

const HarinaTrigo = () => {
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
      <h1>Harina de Trigo</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img src="img/trigo.jpg" alt="Cosechas" />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">
            La harina de trigo es un ingrediente esencial en la cocina, versátil
            y fundamental. Se utiliza para hacer masas tanto dulces como
            saladas, así como para la elaboración de pan, rebozar carnes y
            pescados, entre otros usos.
          </p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: ₡2,500 colones</p>
          <br />
          <BotonCarrito
            producto={{ precio: 2500, detalle: "Harina de trigo" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HarinaTrigo;
