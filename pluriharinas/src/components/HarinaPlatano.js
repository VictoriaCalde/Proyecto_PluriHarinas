import React from 'react';
import './Harinas.css';
import BotonCarrito from './CarritoCompra';
import { Link } from "react-router-dom";

const HarinaPlatano = () => {
  return (
    <div>
      <ul className="harina-ul">
        <li><h1 className="harina-h1">Pluri Harinas</h1></li>
        <li className="harina-li">
          <Link to="/ListarProductos">Producto</Link>
        </li>
      </ul>
      <h1>Harina de Platano</h1>
      <div className="harina" id="harina">
        <div className="imagen">
          <img src="img/HarinaDePlatano1.png" alt="Cosechas" />
        </div>
        <div className="harina-datos">
          <h2>Descripción</h2>
          <p className="harina-p">La harina de plátano contiene vitamina A, magnesio, zinc y fósforo. No contiene gluten o azúcares procesadas y tampoco lleva conservadores. 
            Esta harina la podemos utilizar para platillos dulces y salados ya que, no tiene un fuerte sabor a plátano; por el contrario, al hornearse 
            queda con un sabor neutro.</p>
        </div>
        <div className="harina-info">
          <p className="harina-p">Precio: 1.000 colones</p>
          <br />
          <BotonCarrito producto={{ precio: 1000, detalle: 'Harina de platano'}} />
        </div>
      </div>
    </div>
  );
};



export default HarinaPlatano;
