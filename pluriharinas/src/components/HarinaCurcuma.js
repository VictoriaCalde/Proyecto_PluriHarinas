import React from "react";
import BotonCarrito from "./CarritoCompra";
import "../components/styles/Harinas.css";
import { Link } from "react-router-dom";

const DetalleCurcuma = () => {
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
      <h1>Harina de Cúrcuma</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img
            src="img/como_usar_la_curcuma_en_remedios_caseros_22450_orig.jpg"
            alt="Cosechas"
          />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">
            La cúrcuma, proveniente de una planta medicinal, sirve como
            antiinflamatorio, antioxidante, antibacteriano y digestivo. Se puede
            usar como aderezo, sazonador de comidas o en jugos.
          </p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: ₡2,000 colones</p>
          <br />
          <BotonCarrito
            producto={{ precio: 2000, detalle: "Harina de Cúrcuma" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetalleCurcuma;
