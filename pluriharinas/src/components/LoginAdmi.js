import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/LoginAdmi.css';

const LoginAdmi = () => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Intentando iniciar sesión con:", { correo, clave: '***' });

        try {
            const response = await axios.post('http://localhost:4000/loginAdministrador', {
                correo,
                clave
            });

            console.log("Respuesta del servidor:", response.data);

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                console.log('Inicio de sesión exitoso como administrador');
                // Aquí puedes redirigir al usuario o actualizar el estado de la aplicación
            } else {
                setError(response.data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(error.response?.data?.message || 'Error al conectar con el servidor');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar sesión como administrador</h2>
                {error && <div className="error-message">{error}</div>}
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