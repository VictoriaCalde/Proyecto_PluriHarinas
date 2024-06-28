import React, { useState } from "react";
import "../components/styles/MetodoPago.css";

// Componente MetodoPago: maneja los métodos de pago y la confirmación de compra
const MetodoPago = () => {
  const [compraCancelada, setCompraCancelada] = useState(false); // Estado para controlar si la compra ha sido cancelada
  const [pagoConfirmado, setPagoConfirmado] = useState(false); // Estado para controlar si el pago ha sido confirmado

  // Función para manejar la cancelación de la compra
  const handleCancelarCompra = () => {
    setCompraCancelada(true);
  };

  // Función para manejar la confirmación del pago
  const handleConfirmarPago = () => {
    setPagoConfirmado(true);
    // Aquí se puede añadir la lógica adicional para confirmar el pago
    // Por ejemplo, enviar una solicitud al servidor para procesar el pago
  };

  return (
    <>
      {/* Encabezado */}
      <ul>
        <li>
          <h1>Pluri Harinas</h1>
        </li>
        <li>Métodos de Pago</li>
      </ul>

      {/* Formulario de métodos de pago */}
      <form>
        <div className="contenedor">
          {/* Renderización de botones para diferentes métodos de pago */}
          {["Sinpe", "Transferencia", "Efectivo", "Tarjeta"].map(
            (metodo, index) => (
              <button
                key={index}
                type="button"
                className="boton-pago"
                onClick={handleConfirmarPago}
              >
                {metodo}
              </button>
            )
          )}

          {/* Botón para cancelar la compra */}
          <a
            href="#popup1"
            className="boton-pago"
            onClick={handleCancelarCompra}
          >
            Cancelar
          </a>

          {/* Popup para mostrar estado de compra cancelada */}
          <div
            id="popup1"
            className={`popup ${compraCancelada ? "active" : ""}`}
          >
            <p>Su compra ha sido {compraCancelada ? "cancelada" : ""}</p>
            {compraCancelada && (
              <a href="ListarProductos" className="close-btn">
                Aceptar
              </a>
            )}
          </div>

          {/* Popup para mostrar estado de pago confirmado */}
          <div
            id="popupPago"
            className={`popup ${pagoConfirmado ? "active" : ""}`}
          >
            <p>Su pago ha sido aceptado {pagoConfirmado ? "" : ""}</p>
            {pagoConfirmado && (
              <a href="ListarProductos" className="close-btn">
                Aceptar
              </a>
            )}
          </div>

          {/* Overlay para oscurecer el fondo cuando se muestra el popup de cancelación */}
          <div
            id="overlay1"
            className={`overlay ${compraCancelada ? "active" : ""}`}
          />
        </div>
      </form>
    </>
  );
};

export default MetodoPago;
