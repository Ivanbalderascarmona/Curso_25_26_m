//# Catálogo dinámico de productos

import { productos } from '../db/data';

/**
 * Construye un índice de búsqueda de productos.
 * @returns {Map} Map donde la clave es la palabra y el valor un Set de IDs de productos.
 */
const construirIndiceBusqueda = () => {
  const indice = new Map();

  productos.forEach(producto => {
    // 1️⃣ Extraemos palabras de nombre, descripcion y categoria
    const palabrasTexto = `${producto.nombre} ${producto.descripcion} ${producto.categoria}`;
    // Separamos en palabras usando cualquier caracter que no sea letra/número
    const palabrasArray = palabrasTexto.toLowerCase().split(/\W+/);

    // 2️⃣ También añadimos las etiquetas
    const etiquetas = producto.etiquetas.map(tag => tag.toLowerCase());

    // 3️⃣ Unimos todas las palabras
    const todasPalabras = [...palabrasArray, ...etiquetas];

    // 4️⃣ Añadimos cada palabra al Map
    todasPalabras.forEach(palabra => {
      if (palabra.trim() === '') return; // ignorar strings vacíos

      if (!indice.has(palabra)) {
        indice.set(palabra, new Set());
      }
      indice.get(palabra).add(producto.id);
    });
  });

  // 5️⃣ Guardamos en localStorage (convirtiendo Sets a Arrays)
  const indiceObj = {};
  indice.forEach((set, palabra) => {
    indiceObj[palabra] = Array.from(set);
  });
  localStorage.setItem('indiceBusqueda', JSON.stringify(indiceObj));

  return indice;
};

const buscarProductos = (termino, filtros = {}) => {

  const indiceJSON = localStorage.getItem('indiceBusqueda');
  if (!indiceJSON) return [];

  const indice = new Map(Object.entries(JSON.parse(indiceJSON)));

  if(typeof termino !== 'string'){
    throw new Error('El termino tiene que ser un string.');
  }
  const idProductos = indice.get(termino.trim().toLowerCase()) ?? [];

  if(!Array.isArray(idProductos) || idProductos.length === 0) return [];

  const productosEncontrados = productos
    .filter(p => idProductos.includes(p.id));

  const resultradosFiltrados = productosEncontrados.filter((producto) => {
    
    const filtCategoria = !filtros?.categoria || producto.categoria === filtros.categoria;

    const filtPrecio = (!filtros?.precio?.min ||producto.precio >= filtros.precio.min ) && 
    (!filtros?.precio?.max ||producto.precio <= filtros.precio.max) ;

    const filtValoracionMin = !filtros?.valoracionMin || producto.valoracion >= filtros.valoracionMin;

    return filtCategoria && filtPrecio && filtValoracionMin;
  });

  const productosOrdenados = resultradosFiltrados.sort((a, b) => b.valoracion - a.valoracion );

  return productosOrdenados;
};

const gestionarFavoritos = () => {
  const favoritos= new Set();

  const agregar = (idProducto) => {
    if(!productos.find(p => p.id === idProducto)){
      throw new Error('No existe un producto con id = ',idProducto);
    }
    if(favoritos.has(idProducto)){
      console.log('El producto ya esta añadido en favoritos.');
    }else{
      favoritos.add(idProducto);
    }
  };

  const eliminar = (idProducto) => {
    if(!productos.find(p => p.id === idProducto)){
      throw new Error('No existe un producto con id = ',idProducto);
    }
    if (favoritos.has(idProducto)) {
      favoritos.delete(idProducto);
    }else{
      console.log('El producto no se encuentra en favoritos.');
    }
  };

  const obtenerTodos = () => {
    const idFavoritos = [];
    favoritos.forEach(id => idFavoritos.push(id));
    return idFavoritos;
  };

  const esFavorito = (idProducto) => {
    if(!productos.find(p => p.id === idProducto)){
      throw new Error('No existe un producto con id = ',idProducto);
    }
    return favoritos.has(idProducto);
  };

  localStorage.setItem('favoritos',JSON.stringify(favoritos));

  return {agregar, eliminar, obtenerTodos, esFavorito};
};

const testEjercicio02 = () => {
  const indice = construirIndiceBusqueda();
  console.log('Índice construido con', indice.size, 'términos');
  console.log('Término "laptop" encontrado en', indice.get('laptop').size, 'productos');
  
  const resultados1 = buscarProductos('laptop');
  console.log('Resultados para "laptop":', resultados1.length);

  const resultados2 = buscarProductos('laptop', {
    categoria: 'Electronica',
    valoracionMin: 4.5
  });
  console.log('Resultados filtrados:', resultados2.length);

  const favs = gestionarFavoritos();
  favs.agregar(101);
  favs.agregar(103);
  console.log('Total favoritos:', favs.obtenerTodos().length);
  console.log('¿101 es favorito?', favs.esFavorito(101));

  favs.eliminar(101);
  console.log('¿101 sigue siendo favorito?', favs.esFavorito(101));
  
};

export default testEjercicio02;