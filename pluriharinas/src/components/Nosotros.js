import React from "react";
import { Link } from "react-router-dom";

const Nosotros = () => {
  return (
    <div>
      <ul>
        <li className="dropdown">
          <Link to=" " className="dropbtn">Productos</Link>
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
          <a href="Carrito">Carrito</a>
        </li>
      </ul>
      <div className="heading">
        <h1>Nosotros</h1>
      </div>
      <p>Pluri harinas es un proyecto que nació en el corazón de un pintoresco pueblo rural llamado Biolley,
        una comunidad aledaña al parque Internacional La Amistad. Este innovador proyecto viene de una humilde
        familia que se dedica al trabajo de campo, esta familia inspirados por la necesidad de fomentar la
        autosuficiencia y la conexión con la tierra, decidieron crear un proyecto de procesamiento de harinas locales
        y sostenibles.
      </p>
      <p>
        Su objetivo era aprovechar los campos fértiles que rodeaban su pueblo y tierras, ofrecer a la comunidad
        harinas de alta calidad, producidas de manera ética y respetuosa con el medio ambiente. Los Arias demostraron que,
        incluso después de tiempos difíciles, la creatividad, la colaboración y el amor por la tierra pueden ser la base de
        un proyecto que va más allá de lo comercial, enriqueciendo no solo el pan diario de la gente, sino también su calidad de vida.
      </p>
      <p>
        El proyecto comenzó con un enfoque en la agricultura regenerativa. En lugar de depender de monocultivos intensivos,
        se implementaron prácticas agrícolas que promovían la diversidad de cultivos y mejoraban la salud del suelo. Alicia y su
        equipo introdujeron técnicas de cultivo sin labranza, rotación de cultivos y cultivos de cobertura para reducir la erosión
        del suelo y aumentar la biodiversidad en los campos.
      </p>
    </div>
  );
}

export default Nosotros;
