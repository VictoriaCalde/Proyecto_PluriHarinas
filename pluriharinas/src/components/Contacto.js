import React from "react";
import { Link } from "react-router-dom";

const Contacto = () => {
  return (
    <>
      <ul>
        <li className="dropdown">
          <Link to=" " className="dropbtn">
            Productos
          </Link>
          <div className="dropdown-content">
            <Link to="/ListarProductos">Mostrar Lista</Link>
            <Link to="/EmitirFactura">Emitir Factura</Link>
          </div>
        </li>
        <li>
          <Link to="/Nosotros">Nosotros</Link>
        </li>
        <li>
          <Link to="/Contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/Cliente">Cliente</Link>
        </li>
        <li>
          <a href="#Carrito">Carrito</a>
        </li>
      </ul>
      <div className="heading">
        <h1>Contactenos</h1>
      </div>
      <div className="contact-info">
        <p>Correo Electrónico:</p>
        <p>
          <a href="mailto:aliciaariasch25@gmail.com">
            aliciaariasch25@gmail.com
          </a>
        </p>
        <p>Número de Celular:</p>
        <p>+506 8796-1122</p>
        <p>Redes Sociales:</p>
        <p>Pluri Harinas</p>
      </div>
    </>
  );
};

export default Contacto;
