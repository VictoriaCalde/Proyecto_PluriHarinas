import React, { useState, useEffect } from "react";
import "./EmitirFactura.css";
import axios from "axios";
import { addDays, format } from "date-fns";

const Factura = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/ObtenerProductos"
      );
      if (response.data.success) {
        setProductos(response.data.productos);
      } else {
        console.error("Error al obtener productos:", response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const calcularTotalProducto = (producto) => {
    return producto.Cantidad * producto.Precio;
  };

  const calcularTotalGeneral = () => {
    return productos.reduce(
      (total, producto) => total + calcularTotalProducto(producto),
      0
    );
  };

  return (
    <div>
      <ul>
        <li>
          <h1>Pluri Harinas</h1>
        </li>
        <li>Factura</li>
      </ul>
      <div className="factura">
      
        <p>Fecha de emisión: {new Date().toLocaleDateString()}</p>

        <table>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Fecha de retiro</th>
              <th>Total por producto</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.IdProducto}>
                <td>{producto.Detalle}</td>
                <td>{producto.Cantidad}</td>
                <td>₡{producto.Precio}</td>
                <td>
                  {format(
                    addDays(new Date(producto.Fecha_Retiro), 1),
                    "yyyy-MM-dd"
                  )}
                </td>
                <td>₡{calcularTotalProducto(producto)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                Total General:
              </td>
              <td>₡{calcularTotalGeneral()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Factura;
