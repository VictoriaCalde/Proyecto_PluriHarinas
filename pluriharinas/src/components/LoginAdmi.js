import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/LoginAdmi.css';

const LoginAdmi = () => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:4000/loginAdministrador', {
                correo,
                clave
            });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setSuccessMessage('Inicio de sesión exitoso como administrador');
                // Establecer una bandera para indicar que la redirección es válida
                sessionStorage.setItem('validRedirect', 'true');
                navigate('/dashboardadmin');
            } else {
                setError(response.data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al conectar con el servidor');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar sesión como administrador</h2>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-group">
                    <label htmlFor="correo">Correo electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clave">Contraseña:</label>
                    <input
                        type="password"
                        id="clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginAdmi;