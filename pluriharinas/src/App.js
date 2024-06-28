import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import ListarProductos from "./components/ListarProductos";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import MetodoPago from "./components/MetodoPago";
import EmitirFactura from "./components/EmitirFactura";
import CarritoCompra from "./components/CarritoCompra";
import MenuExterno from "./components/menuExterno";
import Registro from "./components/registro";
import InicioSesion from "./components/InicioSesion";
import CargarProducto from "./components/CargarProducto";
import LoginAdmi from "./components/LoginAdmi";
import DashboardAdmin from "./components/DashboardAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuExterno />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/listarproductos" element={<ListarProductos />} />
          <Route path="/emitirfactura" element={<EmitirFactura />} />
          <Route path="/metodo-pago" element={<MetodoPago />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/cargarproducto" element={<CargarProducto />} />
          <Route path="/loginadmi" element={<LoginAdmi />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route
            path="/carritocompra"
            element={
              <ProtectedRoute>
                <CarritoCompra />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
