//# Sistema de Gestión de inventario

import { productos } from '../db/data';

export const crearInventario = () => {
  
  const inventario = new Map();
  productos.map((producto) => {
    inventario.set(producto.id, {
      id:producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      stockActual: producto.stock,
      stockMinimo: producto.stock*0.1,
      precio: producto.precio,
      alertas: []
    });
  });
  const inventarioObj = Object.fromEntries(inventario);
  localStorage.setItem('inventario',JSON.stringify(inventarioObj));
  
  return inventario;

};