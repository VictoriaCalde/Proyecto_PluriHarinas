import React, { useState } from "react";
import "./MetodoPago.css";

const MetodoPago = () => {
  const [compraCancelada, setCompraCancelada] = useState(false);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);

  const handleCancelarCompra = () => {
    setCompraCancelada(true);
  };

  const handleConfirmarPago = ()  => {
    setPagoConfirmado(true);
    // Lógica para confirmar el pago
    // Puedes realizar las acciones necesarias aquí
  };

  return (
    <>
      <ul>
        <li>
          <h1>Pluri Harinas</h1>
        </li>
        <li>Métodos de Pago</li>
      </ul>
      <form>
        <div className="contenedor">
          {["Sinpe", "Transferencia", "Efectivo", "Tarjeta"].map((metodo, index) => (
            <button key={index} type="button" onClick={handleConfirmarPago}>
              {metodo}
            </button>
          ))}
          <a
            href="#popup1"
            className="open-popup-btn"
            onClick={handleCancelarCompra}
          >
            Cancelar
          </a>
          <div id="popup1" className={`popup ${compraCancelada ? "active" : ""}`}>
            <p>
              Su compra ha sido {compraCancelada ? "cancelada" : "registrada"}
            </p>
            {compraCancelada && (
              <a href="ListarProductos" className="close-btn">
                Aceptar
              </a>
            )}
          </div>
          <div id="popupPago" className={`popup ${pagoConfirmado ? "active" : ""}`}>
            <p>
              Su pago ha sido confirmado {pagoConfirmado ? "" : ""}
            </p>
            {pagoConfirmado && (
              <a href="ListarProductos" className="close-btn">
                Aceptar
              </a>
            )}
          </div>
          <div id="overlay1" className={`overlay ${compraCancelada ? "active" : ""}`} />
        </div>
      </form>
    </>
  );
};

export default MetodoPago;
