import React from "react";
import { Link } from "react-router-dom";
import "./ListarProductos.css";

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
      imagenSrc: "img/malanga.jpg",
      nombre: "Harina de Malanga",
      peso: "500 gramos",
      precio: "2.000",
      descripcion:
        " En consistencia es muy similar a la papa, yuca o camote, pero a diferencia de estas tiene un sabor más dulce, más cercano al camote pero con toques ligeramente parecidos a una mezcla entre la nuez, la vainilla y la avellana por lo cual se acopla tanto en recetas saladas o dulces.",
    },
    {
      to: "/harina-maiz",
      imagenSrc: "img/Harina-de-maiz.jpg",
      nombre: "Harina de Maíz",
      peso: "500 gramos",
      precio: "1.500",
      descripcion:
        "La harina del maíz es el polvo de moler los granos o semillas de una mazorca de maíz. Hay diferentes técnicas y formas de obtenerla. Es un alimento rico en magnesio, calcio y potasio y dado que su contenido en fibra es elevado. Además no contiene gluten y es apta para celíacos.",
    },
    {
      to: "/harina-trigo",
      imagenSrc: "img/trigo.jpg",
      nombre: "Harina de Trigo",
      peso: "500 gramos",
      precio: "2.500",
      descripcion:
        "La harina de trigo es uno de los ingredientes más básicos y fundamentales en la cocina. Se puede usar para elaborar tanto masas dulces como saladas. Aunque también se utiliza para hacer pan, rebozar carnes y pescados, etc.",
    },
    {
      to: "/harina-curcuma",
      imagenSrc: "img/como_usar_la_curcuma_en_remedios_caseros_22450_orig.jpg",
      nombre: "Harina de Cúrcuma",
      peso: "500 gramos",
      precio: "2.000",
      descripcion:
        "La cúrcuma, proveniente de una planta medicinal, sirve como anti inflamatorio, antioxidante, antibacteriano, y digestivo. Se puede usar como aderezo, sazonador de comidas o en jugos.",
    },
    {
      to: "/harina-platano",
      imagenSrc: "img/HarinaDePlatano1.png",
      nombre: "Harina de Plátano",
      peso: "500 gramos",
      precio: "1.000",
      descripcion:
        "La harina de plátano contiene vitamina A, magnesio, zinc y fósforo. No contiene gluten o azúcares procesadas y tampoco lleva conservadores. Esta harina la podemos utilizar para platillos dulces y salados ya que, no tiene un fuerte sabor a plátano; por el contrario, al hornearse queda con un sabor neutro.",
    },
    {
      to: "/harina-yuca",
      imagenSrc: "img/yuca-flour-tapioca-cativia-CG11707.jpg",
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
