import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListarProductos from './components/ListarProductos';
import HarinaMalanga from './components/HarinaMalanga';
import HarinaMaiz from './components/HarinaMaiz';
import HarinaTrigo from './components/HarinaTrigo';
import HarinaCurcuma from './components/HarinaCurcuma';
import HarinaPlatano from './components/HarinaPlatano';
import HarinaYuca from './components/HarinaYuca';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import MetodoPago from './components/MetodoPago';
import EmitirFactura from './components/EmitirFactura';
import CarritoCompra from './components/CarritoCompra';
import MenuExterno from './components/menuExterno';
import Registro from './components/registro';
import InicioSesion from './components/InicioSesion';
import CargarProducto from './components/CargarProducto';
import LoginAdmi from './components/LoginAdmi';
import DashboardAdmin from './components/DashboardAdmin';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuExterno />} />
        <Route path="/harina-malanga" element={<HarinaMalanga />} />
        <Route path="/harina-trigo" element={<HarinaTrigo />} />
        <Route path="/harina-curcuma" element={<HarinaCurcuma />} />
        <Route path="/harina-maiz" element={<HarinaMaiz />} />
        <Route path="/harina-yuca" element={<HarinaYuca />} />
        <Route path="/harina-platano" element={<HarinaPlatano />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/listarproductos" element={<ListarProductos />} />
        <Route path="/emitirfactura" element={<EmitirFactura />} />
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/carritocompra" element={<CarritoCompra />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/cargarproducto" element={<CargarProducto />} />
        <Route path="/loginadmi" element={<LoginAdmi />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
