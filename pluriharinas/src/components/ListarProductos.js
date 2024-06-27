/*import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/ListarProductos.css";
import malanga from "../img/malanga.jpg";
import maiz from "../img/Harina-de-maiz.jpg";
import trigo from "../img/trigo.jpg";
import curcuma from "../img/como_usar_la_curcuma_en_remedios_caseros_22450_orig.jpg";
import platano from "../img/HarinaDePlatano1.png";
import yuca from "../img/yuca-flour-tapioca-cativia-CG11707.jpg";

const Producto = ({ to, imagenSrc, nombre, peso, precio, descripcion }) => {
  return (
    <Link to={to} className="producto-link">
      <div className="imagen">
        <img src={imagenSrc} alt={nombre} />
        <div className="informacion">
          <h2>{nombre}</h2>
          <p>Peso: {peso}</p>
          <p>Precio: {precio} colones</p>
          <h2>Descripción</h2>
          <p>{descripcion}</p>
        </div>
      </div>
    </Link>
  );
};

const ListarProductos = () => {
  const productos = [
    {
      to: "/harina-malanga",
      imagenSrc: malanga,
      nombre: "Harina de Malanga",
      peso: "500 gramos",
      precio: "2.000",
      descripcion:
        " En consistencia es muy similar a la papa, yuca o camote, pero a diferencia de estas tiene un sabor más dulce, más cercano al camote pero con toques ligeramente parecidos a una mezcla entre la nuez, la vainilla y la avellana por lo cual se acopla tanto en recetas saladas o dulces.",
    },
    {
      to: "/harina-maiz",
      imagenSrc: maiz,
      nombre: "Harina de Maíz",
      peso: "500 gramos",
      precio: "1.500",
      descripcion:
        "La harina del maíz es el polvo de moler los granos o semillas de una mazorca de maíz. Hay diferentes técnicas y formas de obtenerla. Es un alimento rico en magnesio, calcio y potasio y dado que su contenido en fibra es elevado. Además no contiene gluten y es apta para celíacos.",
    },
    {
      to: "/harina-trigo",
      imagenSrc: trigo,
      nombre: "Harina de Trigo",
      peso: "500 gramos",
      precio: "2.500",
      descripcion:
        "La harina de trigo es uno de los ingredientes más básicos y fundamentales en la cocina. Se puede usar para elaborar tanto masas dulces como saladas. Aunque también se utiliza para hacer pan, rebozar carnes y pescados, etc.",
    },
    {
      to: "/harina-curcuma",
      imagenSrc: curcuma,
      nombre: "Harina de Cúrcuma",
      peso: "500 gramos",
      precio: "2.000",
      descripcion:
        "La cúrcuma, proveniente de una planta medicinal, sirve como anti inflamatorio, antioxidante, antibacteriano, y digestivo. Se puede usar como aderezo, sazonador de comidas o en jugos.",
    },
    {
      to: "/harina-platano",
      imagenSrc: platano,
      nombre: "Harina de Plátano",
      peso: "500 gramos",
      precio: "1.000",
      descripcion:
        "La harina de plátano contiene vitamina A, magnesio, zinc y fósforo. No contiene gluten o azúcares procesadas y tampoco lleva conservadores. Esta harina la podemos utilizar para platillos dulces y salados ya que, no tiene un fuerte sabor a plátano; por el contrario, al hornearse queda con un sabor neutro.",
    },
    {
      to: "/harina-yuca",
      imagenSrc: yuca,
      nombre: "Harina de Yuca",
      peso: "500 gramos",
      precio: "2.000",
      descripcion:
        "La harina de yuca es muy rica en hidratos de carbono y no contiene gluten lo que hace son consumo apto para celíacos. Tiene buenas cualidades espesantes por lo que puede ser uno de nuestros recursos en la cocina para espesar salsas.",
    },
  ];

  return (
    <div>
      <ul className="menu">
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
          <a href="/Carrito">Carrito</a>
        </li>
      </ul>

      <h1>Productos</h1>
      <div className="galeria">
        {productos.map((producto, index) => (
          <Producto key={index} {...producto} />
        ))}
      </div>
    </div>
  );
};

export default ListarProductos;
*/
/*
// ListarProductos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/styles/ListarProductos.css";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/ObtenerProductos');
        setProductos(res.data.productos); // Asigna solo el array de productos a estado
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>{producto.precio}</p>
            <img src={`http://localhost:4000/${producto.imagenRuta}`} alt={ producto.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProductos;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/styles/ListarProductos.css";
import { Link } from "react-router-dom";


const ListarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/ObtenerProductos');
        setProductos(res.data.productos); // Asigna solo el array de productos a estado
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <ul className="menu">
        <li className="dropdown">
          <a href="/" className="dropbtn">Productos</a>
          <div className="dropdown-content">
            <a href="/ListarProductos">Mostrar Lista</a>
            <a href="/EmitirFactura">Emitir Factura</a>
          </div>
        </li>
        <li>
          <a href="/Nosotros">Nosotros</a>
        </li>
        <li>
          <a href="/Contacto">Contacto</a>
        </li>
        <li>
          <a href="/Cliente">Cliente</a>
        </li>
        <li>
          <a href="/Carrito">Carrito</a>
        </li>
      </ul>

      <h1>Productos</h1>
      <div className="galeria">
        {productos.map((producto, index) => (
          <Link to="/CarritoCompra" key={index}>
            <div className="imagen">
              <img src={`http://localhost:4000/${producto.imagenRuta}`} alt={producto.nombre} />
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


