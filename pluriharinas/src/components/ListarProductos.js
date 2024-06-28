import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/styles/ListarProductos.css";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/ObtenerProductos");
        setProductos(res.data.productos); // Asigna solo el array de productos a estado
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <ul className="menu">
        <li className="dropdown">
          <a href="/" className="dropbtn">
            Productos
          </a>
          <div className="dropdown-content">
            <a href="/ListarProductos">Mostrar Lista</a>
            <a href="/EmitirFactura">Emitir Factura</a>
          </div>
        </li>
        <li className="menu-externo-item">
          <Link to="/nosotros" className="menu-externo-link">
            Nosotros
          </Link>
        </li>
        <li className="menu-externo-item">
          <Link to="/contacto" className="menu-externo-link">
            Contacto
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="menu-externo-item">
              <Link to="/CarritoCompra" className="menu-externo-link">
                Carrito de Compra
              </Link>
            </li>
            <li className="menu-externo-item">
              <span className="menu-externo-link" onClick={logout}>
                Cerrar Sesión
              </span>
            </li>
          </>
        ) : (
          <li className="menu-externo-item">
            <span className="menu-externo-link" onClick={toggleDropdown}>
              Ingresar
            </span>
            {mostrarDropdown && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/registro" className="menu-externo-link">
                    Registro
                  </Link>
                </li>
                <li>
                  <Link to="/InicioSesion" className="menu-externo-link">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>

      <h1>Productos</h1>
      <div className="galeria">
        {productos.map((producto, index) => (
          <Link to="/CarritoCompra" key={index}>
            <div className="imagen">
              <img
                src={`http://localhost:4000/${producto.imagenRuta}`}
                alt={producto.nombre}
              />
              <div className="informacion">
                <h2>{producto.nombre}</h2>
                <p>Peso: {producto.peso}</p>
                <p>Precio: {producto.precio} colones</p>
                <h2>Descripción</h2>
                <p>{producto.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListarProductos;
