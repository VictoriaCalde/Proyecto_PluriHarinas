import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/styles/Nosotros.css";
import jenjibre from "../img/jenjibre-e1594343131877.jpg";
import trigo from "../img/trigo.jpg";
import malanga from "../img/malanga.jpg";

const Nosotros = ({ isLoggedIn, logout }) => {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  return (
    <div className="nosotros-section">
      <ul className="menu-externo-list">
        <li className="menu-externo-item">
          <Link to="/ListarProductos" className="menu-externo-link">Productos</Link>
        </li>
        <li className="menu-externo-item">
          <Link to="/nosotros" className="menu-externo-link">Nosotros</Link>
        </li>
        <li className="menu-externo-item">
          <Link to="/contacto" className="menu-externo-link">Contacto</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="menu-externo-item">
              <Link to="/CarritoCompra" className="menu-externo-link">Carrito de Compra</Link>
            </li>
            <li className="menu-externo-item">
              <span className="menu-externo-link" onClick={logout}>Cerrar Sesión</span>
            </li>
          </>
        ) : (
          <li className="menu-externo-item">
            <span className="menu-externo-link" onClick={toggleDropdown}>Ingresar</span>
            {mostrarDropdown && (
              <ul className="dropdown-content">
                <li><Link to="/registro" className="menu-externo-link">Registro</Link></li>
                <li><Link to="/InicioSesion" className="menu-externo-link">Iniciar Sesión</Link></li>
              </ul>
            )}
          </li>
        )}
      </ul>
      <h1 className="nosotros-title">Nosotros</h1>
      <p className="nosotros-description">
        Pluri harinas es un proyecto que nació en el corazón de un pintoresco
        pueblo rural llamado Biolley, una comunidad aledaña al parque
        Internacional La Amistad. Este innovador proyecto viene de una humilde
        familia que se dedica al trabajo de campo, esta familia inspirados por
        la necesidad de fomentar la autosuficiencia y la conexión con la tierra,
        decidieron crear un proyecto de procesamiento de harinas locales y
        sostenibles.
      </p>
      <p className="nosotros-description">
        Su objetivo era aprovechar los campos fértiles que rodeaban su pueblo y
        tierras, ofrecer a la comunidad harinas de alta calidad, producidas de
        manera ética y respetuosa con el medio ambiente. Los Arias demostraron
        que, incluso después de tiempos difíciles, la creatividad, la
        colaboración y el amor por la tierra pueden ser la base de un proyecto
        que va más allá de lo comercial, enriqueciendo no solo el pan diario de
        la gente, sino también su calidad de vida.
      </p>
      <p className="nosotros-description">
        El proyecto comenzó con un enfoque en la agricultura regenerativa. En
        lugar de depender de monocultivos intensivos, se implementaron prácticas
        agrícolas que promovían la diversidad de cultivos y mejoraban la salud
        del suelo. Alicia y su equipo introdujeron técnicas de cultivo sin
        labranza, rotación de cultivos y cultivos de cobertura para reducir la
        erosión del suelo y aumentar la biodiversidad en los campos.
      </p>
      <h1 className="nosotros-images-title">Imágenes de referencia</h1>
      <div className="nosotros-gallery">
        {[jenjibre, trigo, malanga].map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt="Cosechas" className="nosotros-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nosotros;
