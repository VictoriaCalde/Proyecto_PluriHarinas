import React, { useState } from "react";
import axios from "axios";
import "../components/styles/registro.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    contrasenna: "",
    correo: "",
    telefono: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/Registro", formData)
      .then((response) => {
        setMensaje(
          response.data.success ? "Registro exitoso" : response.data.message
        );
      })
      .catch(() => {
        setMensaje("Ya existe un registro con este correo electrónico");
      });
  };

  return (
    <div className="registro-page">
      <ul className="barra-registro">
        <h1>Pluri Harinas</h1>
      </ul>
      <div className="registro-container">
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>

          <label htmlFor="nombre">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasenna">Contraseña:</label>
          <input
            type="password"
            id="contrasenna"
            name="contrasenna"
            value={formData.contrasenna}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefono">Número de Celular:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrarse</button>

          <label>
            Al continuar, aceptas los{" "}
            <a
              className="derechoslink"
              href="https://www.cgr.go.cr/07-cgr-varios/terminos-condiciones-uso.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos de uso
            </a>
          </label>
          <br />
          <label>
            Lea nuestras{" "}
            <a
              className="privacidadlink"
              href="https://terminosya.com/generador-politica-de-privacidad?gclid=Cj0KCQiAjMKqBhCgARIsAPDgWlw86u4b7XznLRozQWupMZ6WoiPfH0DyXHclPYsuyRomiyWuls46RjYaAm_YEALw_wcB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Políticas de Privacidad
            </a>
          </label>

          {mensaje && <p>{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default Registro;
