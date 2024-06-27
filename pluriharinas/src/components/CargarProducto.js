// CargarProducto.js
import React, { useState } from 'react';
import axios from 'axios';

const CargarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    peso: '',
    precio: '',
    descripcion: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      const res = await axios.post('http://localhost:4000/cargarproductos', form);
      console.log(res.data);
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input type="text" name="peso" placeholder="Peso" onChange={handleChange} />
      <input type="text" name="precio" placeholder="Precio" onChange={handleChange} />
      <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input type="file" name="imagen" onChange={handleFileChange} />
      <button type="submit">Cargar Producto</button>
    </form>
  );
};

export default CargarProducto;
