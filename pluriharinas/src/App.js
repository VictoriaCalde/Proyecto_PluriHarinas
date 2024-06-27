// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListarProductos from "./components/ListarProductos";
import HarinaMalanga from "./components/HarinaMalanga";
import HarinaMaiz from "./components/HarinaMaiz";
import HarinaTrigo from "./components/HarinaTrigo";
import HarinaCurcuma from "./components/HarinaCurcuma";
import HarinaPlatano from "./components/HarinaPlatano";
import HarinaYuca from "./components/HarinaYuca";
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

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MenuExterno />} />
        <Route path="/harina-malanga" element={<HarinaMalanga />} />
        <Route path="/harina-trigo" element={<HarinaTrigo />} />
        <Route path="/harina-curcuma" element={<HarinaCurcuma />} />
        <Route path="/harina-maiz" element={<HarinaMaiz />} />
        <Route path="/harina-Yuca" element={<HarinaYuca />} />
        <Route path="/harina-Platano" element={<HarinaPlatano />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/ListarProductos" element={<ListarProductos />} />
        <Route path="/EmitirFactura" element={<EmitirFactura />} />
        <Route path="/Metodo-Pago" element={<MetodoPago />} />
        <Route path="/CarritoCompra" element={<CarritoCompra />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/InicioSesion" element={<InicioSesion />} />
        <Route path="/CargarProducto" element={<CargarProducto />} />
        <Route path="/LoginAdmi" element={<LoginAdmi />} />
        
      </Routes>
    </Router>
  );
};

export default App;
