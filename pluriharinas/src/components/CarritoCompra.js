

import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/styles/Harinas.css";

const BotonCarrito = ({ producto, onAgregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0);
  const [fechaRetiro, setFechaRetiro] = useState(null);
  const [registroRealizado, setRegistroRealizado] = useState(false);

  const handleAgregarCarrito = async () => {
    try {
      if (!cantidad || cantidad < 1 || cantidad > 50 || !fechaRetiro) {
        console.error(
          "Por favor, ingrese una cantidad válida (entre 1 y 50) y seleccione una fecha de retiro."
        );
        return;
      }

      const formattedDate = fechaRetiro.toISOString().split("T")[0];

      await axios.post("http://localhost:4000/IngresarProductoComprado", {
        precio: producto.precio,
        detalle: producto.detalle,
        cantidad: parseInt(cantidad),
        fecha_Retiro: formattedDate,
      });

      setRegistroRealizado(true);

      if (onAgregarCarrito) {
        onAgregarCarrito();
      }
    } catch (error) {
      console.error("Error al agregar al carrito", error);
    }
  };

  const handleCantidadChange = (e) => {
    const newValue = parseInt(e.target.value);
    setCantidad(isNaN(newValue) ? 0 : Math.min(Math.max(newValue, 0), 50));
  };

  return (
    <div>
      <p className="harina-p">Fecha de Retiro:</p>
      <div className="date-picker-container">
        <div className="input-container">
          <DatePicker
            className="custom-datepicker"
            selected={fechaRetiro}
            onChange={(date) => setFechaRetiro(date)}
            dateFormat="yyyy-MM-dd"
          />
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
        </div>
      </div>

      <p className="harina-p">Cantidad:</p>
      <div className="cantidad-container">
        <button onClick={() => setCantidad(Math.max(cantidad - 1, 0))}>
          -
        </button>
        <input
          name="num"
          id="cantidad"
          min="0"
          max="50"
          value={cantidad}
          onChange={handleCantidadChange}
          required
        />
        <button onClick={() => setCantidad(Math.min(cantidad + 1, 50))}>
          +
        </button>
      </div>

      <a href="#popup1" className="custom-btn" onClick={handleAgregarCarrito}>
        Cargar al carrito
      </a>
      <div id="popup1" className={`popup ${registroRealizado ? "active" : ""}`}>
        <p>
          {registroRealizado
            ? "Sus productos se han cargado con éxito"
            : "Seleccione una fecha de retiro o una cantidad válida"}
        </p>
        {registroRealizado ? (
          <a href="/Metodo-Pago" className="close-btn">
            Siguiente
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleAgregarCarrito();
              window.history.go(-1);
            }}
            className="close-btn"
          >
            Aceptar
          </button>
        )}
      </div>
    </div>
  );
};

export default BotonCarrito;