import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/menuExterno.css';
import jenjibre from '../img/jenjibre-e1594343131877.jpg';
import trigo from '../img/trigo.jpg';
import malanga from '../img/malanga.jpg';

const MenuExterno = () => {
  return (
    <div className="menu-externo-container">
    
      <ul className="menu-externo-list">
        <li className="menu-externo-item"><Link to="/ListarProductos" className="menu-externo-link">Productos</Link></li>
        <li className="menu-externo-item"><Link to="/nosotros" className="menu-externo-link">Nosotros</Link></li>
        <li className="menu-externo-item"><Link to="/contacto" className="menu-externo-link">Contacto</Link></li>
        <li className="menu-externo-item"><Link to="/registro" className="menu-externo-link">Registro</Link></li>
        <li className="menu-externo-item"><Link to="/InicioSesion" className="menu-externo-link">Iniciar Sesión</Link></li>
        <li className="menu-externo-item"><Link to="/CargarProducto" className="menu-externo-link">Cargar</Link></li>
        <li className="menu-externo-item"><Link to="/LoginAdmi" className="menu-externo-link">ADMI</Link></li>
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