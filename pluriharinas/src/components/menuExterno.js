import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../components/styles/menuExterno.css';
import jenjibre from '../img/jenjibre-e1594343131877.jpg';
import trigo from '../img/trigo.jpg';
import malanga from '../img/malanga.jpg';

const MenuExterno = () => {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  return (
    <div className="menu-externo-container">
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

      <div className="nuestra-gallery">
        <div className="imagen-container">
          <img src={jenjibre} alt="Cosechas" className="nosotros-image" />
        </div>
        <div className="imagen-container">
          <img src={trigo} alt="Harinas" className="nosotros-image" />
        </div>
        <div className="imagen-container">
          <img src={malanga} alt="Harinas" className="nosotros-image" />
        </div>
      </div>
    </div>
  );
};

export default MenuExterno;