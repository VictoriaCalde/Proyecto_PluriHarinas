import React from 'react';
import '../components/styles/Harinas.css';
import BotonCarrito from './CarritoCompra';
import { Link } from "react-router-dom";

const Yuca = () => {
  return (
    <div>
      <ul className="harina-ul">
        <li><h1 className="harina-h1">Pluri Harinas</h1></li>
        <li className="harina-li">
          <Link to="/ListarProductos">Productos</Link>
        </li>
      </ul>
      <h1>Harina de Yuca</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img src="img/yuca-flour-tapioca-cativia-CG11707.jpg" alt="Cosechas" />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">
            La harina de yuca es una excelente fuente de hidratos de carbono y no contiene gluten, lo que la hace apta para personas celíacas. Además, tiene cualidades espesantes, convirtiéndola en un recurso versátil en la cocina para espesar salsas y otros platillos.
          </p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: ₡2,000 colones</p>
          <br />
          <BotonCarrito producto={{ precio: 2000, detalle: 'Harina de yuca'}} />
        </div>
      </div>
    </div>
  );
};

export default Yuca;
