import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/DashboardAdmin.css';

const DashboardAdmin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkValidAccess = async () => {
            const adminToken = localStorage.getItem('adminToken');

            if (!adminToken) {
                navigate('/loginadmi');
                return;
            }

            try {
                const response = await axios.post('http://localhost:4000/verifyAdminToken', { token: adminToken });
                if (!response.data.valid) {
                    throw new Error('Token inválido');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error al verificar el token de administrador:', error);
                localStorage.removeItem('adminToken');
                navigate('/loginadmi');
            }
        };

        checkValidAccess();
    }, [navigate]);

    const handleCargarProducto = () => {
        // Lógica para cargar producto
        navigate('/cargarproducto');
    };

    const handleVerFacturas = () => {
        // Lógica para ver facturas
        navigate('/verfacturas');
    };
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/loginadmi');
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Panel de Administrador</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <button onClick={handleCargarProducto}>Cargar Producto</button>
            <button onClick={handleVerFacturas}>Ver Facturas</button>
            {/* Contenido del panel de administrador */}
        </div>
    );
};

export default DashboardAdmin;

