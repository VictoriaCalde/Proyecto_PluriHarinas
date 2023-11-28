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

const App = () => {
  return (
    <Router>
      <Routes>
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
        <Route path="/" element={<ListarProductos />} />
      </Routes>
    </Router>
  );
};

export default App;
