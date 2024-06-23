import React from "react";
import "../components/styles/Harinas.css";
import BotonCarrito from "./CarritoCompra";
import { Link } from "react-router-dom";

const DetalleProducto = () => {
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
      <h1>Harina de Maíz</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img src="img/Harina-de-maiz.jpg" alt="Cosechas" />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">
            La harina de maíz es el polvo resultante de moler los granos o
            semillas de una mazorca de maíz. Se obtiene mediante diversas
            técnicas y formas de procesamiento. Es un alimento rico en magnesio,
            calcio y potasio, y debido a su elevado contenido de fibra, es
            beneficioso para la salud. Además, no contiene gluten, haciéndola
            apta para personas con enfermedad celíaca.
          </p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: ₡1,500 colones</p>
          <br />
          <BotonCarrito
            producto={{ precio: 1500, detalle: "Harina de maíz" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
