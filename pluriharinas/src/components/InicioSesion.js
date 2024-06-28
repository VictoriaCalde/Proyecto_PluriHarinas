import React, { useState } from "react";
import axios from "axios";
import "../components/styles/InicioSesion.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const InicioSesion = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    inputEmail: "",
    inputPassword: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/Login", {
        correo: credentials.inputEmail,
        contrasenna: credentials.inputPassword,
      });

      if (response.data.success) {
        setMensaje("Inicio de sesión exitoso");
        login();
        navigate("/");
      } else {
        setMensaje(response.data.message);
      }
    } catch (error) {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="inicio-sesion-page">
      <ul className="barra-inicio-sesion">
        <h1>Pluri Harinas</h1>
      </ul>
      <div className="inicio-sesion-container">
        <form onSubmit={handleSubmit} className="inicio-sesion-form">
          <h2>Iniciar Sesión</h2>
          <label htmlFor="inputEmail">Correo Electrónico:</label>
          <input
            type="email"
            id="inputEmail"
            name="inputEmail"
            value={credentials.inputEmail}
            onChange={handleChange}
            required
          />
          <label htmlFor="inputPassword">Contraseña:</label>
          <input
            type="password"
            id="inputPassword"
            name="inputPassword"
            value={credentials.inputPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Iniciar Sesión</button>
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

export default InicioSesion;
