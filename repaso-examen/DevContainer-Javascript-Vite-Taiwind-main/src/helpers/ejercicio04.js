import { productos } from '../db/data';

const construirTaxonomia = () => {
  const etiquetas = new Set();
  productos.forEach(producto => {
    producto.etiquetas.forEach(etiqueta => etiquetas.add(etiqueta));
  });
  
};