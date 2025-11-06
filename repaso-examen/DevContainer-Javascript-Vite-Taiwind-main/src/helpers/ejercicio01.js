//# Sistema de Gestión de inventario

import { productos } from '../db/data';

/**
 * Esta función te crea un Map con los productos de la base de datos data.js y los guarda en el localStorage
 * @returns Devuelve el inventario de productos.
 */
export const crearInventario = () => {
  
  const inventario = new Map();
  productos.forEach((producto) => {
    inventario.set(Number(producto.id), {
      id:Number(producto.id),
      nombre: producto.nombre,
      categoria: producto.categoria,
      stockActual: Number(producto.stock),
      stockMinimo: Number(producto.stock*0.1),
      precio: Number(producto.precio),
      alertas: []
    });
  });
  const inventarioObj = Object.fromEntries(inventario);
  localStorage.setItem('inventario',JSON.stringify(inventarioObj));
  
  return inventario;

};
/**
 * Esta función gestiona el stock de un producto ya sea aumentando o disminuyendo el stock de este.
 * @param {number} idProducto - Id del producto al que se le va a realizar la modificación.
 * @param {string} operacion - Nombre de la operacion a realizar. Opciones ('entrada' / 'salida') Default 'entrada'.
 * @param {number} cantidad - Cantidad a modificar del stock del producto. Default 1.
 * @returns Si las validaciones son válidas se devuelve el producto actualizado.
 */
export const gestionarStock = (idProducto, operacion = 'entrada', cantidad = 1) => {
  const inventarioObj = JSON.parse(localStorage.getItem('inventario'));
  const inventario = new Map(
    Object.entries(inventarioObj).map(([id, value]) => [
      Number(id), // clave como número
      {
        ...value,
        id: Number(value.id),
        stockActual: Number(value.stockActual),
        stockMinimo: Number(value.stockMinimo),
        precio: Number(value.precio)
      }
    ])
  );

  const producto = inventario.get(idProducto);
  if (!producto) {
    throw new Error('❌ El producto no existe.');
  }
  if (operacion.trim().toLowerCase() !== 'entrada' && operacion.trim().toLowerCase() !== 'salida') {
    throw new Error('❌ La operación no es válida.');
  }
  if (operacion.trim().toLowerCase() === 'entrada') {
    producto.stockActual += cantidad;
  }
  if (operacion.trim().toLowerCase() === 'salida') {
    if (producto.stockActual - cantidad >= 0) {
      producto.stockActual -= cantidad;
    }else{
      throw new Error('La cantidad supera el stock del producto.');
    }
  }
  if (producto.stockActual < producto.stockMinimo) {
    alert(`Stock bajo - Quedan ${producto.stockActual} unidades`);
  }

  inventario.set(Number(idProducto),producto);
  localStorage.setItem('inventario', JSON.stringify(Object.fromEntries(inventario)));

  return producto; 

};

/**
 * Esta funcion te genera un informe del inventario de productos completo.
 * @returns - Retorna un objeto que contiene la información del informe del inventario
 */
export function generarInformeInventario() {
  const inventarioObj = JSON.parse(localStorage.getItem('inventario'));
  const inventario = new Map(
    Object.entries(inventarioObj).map(([id, value]) => [
      Number(id),
      {
        ...value,
        id: Number(value.id),
        stockActual: Number(value.stockActual),
        stockMinimo: Number(value.stockMinimo),
        precio: Number(value.precio)
      }
    ])
  );

  let valorTotal = 0;
  let productosPorCategoria = {};
  let productosBajoStock = 0;
  let stockTotal = 0;

  inventario.forEach((producto) => {
    valorTotal += producto.stockActual * producto.precio;
    productosPorCategoria[producto.categoria] = (productosPorCategoria[producto.categoria] || 0) + 1;
    if (producto.stockActual < producto.stockMinimo) {
      productosBajoStock++;
    }
    stockTotal += producto.stockActual;
  });

  return {
    valorTotal,
    productosPorCategoria,
    productosBajoStock,
    stockPromedio: inventario.size > 0 ? stockTotal / inventario.size : 0
  };
}


const testEjercicio01 = () => {
  const inventario = crearInventario();
  console.log('Inventario creado con', inventario.size, 'productos');

  const resultado1 = gestionarStock(101, 'entrada', 10);
  console.log('Nuevo stock:', resultado1.stockActual); // 35

  try {
    gestionarStock(101, 'salida', 1000);
  } catch (error) {
    console.log('Error:', error.message); // Stock insuficiente
  }

  const informe = generarInformeInventario();
  console.log('Valor total:', informe.valorTotal);
  console.log('Productos bajo stock:', informe.productosBajoStock);
  console.table(informe.productosPorCategoria);

};
export default  testEjercicio01;