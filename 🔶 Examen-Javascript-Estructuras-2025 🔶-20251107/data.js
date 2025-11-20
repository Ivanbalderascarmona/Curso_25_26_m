export const productos = [
  {
    id: 101,
    nombre: "Laptop Gaming Pro",
    categoria: "Electronica",
    precio: 899.99,
    stock: 25,
    valoracion: 4.5
  },
  {
    id: 102,
    nombre: "Monitor 27 4K",
    categoria: "Electronica",
    precio: 329.99,
    stock: 15,
    valoracion: 4.8
  },
  {
    id: 103,
    nombre: "Silla Ergonomica",
    categoria: "Muebles",
    precio: 249.99,
    stock: 30,
    valoracion: 4.2
  },
  {
    id: 104,
    nombre: "Teclado Mecanico RGB",
    categoria: "Electronica",
    precio: 89.99,
    stock: 50,
    valoracion: 4.4
  },
  {
    id: 105,
    nombre: "Escritorio Madera",
    categoria: "Muebles",
    precio: 199.99,
    stock: 12,
    valoracion: 4.0
  },
  {
    id: 106,
    nombre: "Raton Gaming",
    categoria: "Electronica",
    precio: 59.99,
    stock: 40,
    valoracion: 4.3
  },
  {
    id: 107,
    nombre: "Auriculares Bluetooth",
    categoria: "Electronica",
    precio: 79.99,
    stock: 35,
    valoracion: 4.1
  },
  {
    id: 108,
    nombre: "Lampara LED",
    categoria: "Hogar",
    precio: 39.99,
    stock: 60,
    valoracion: 3.9
  }
];

export const usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@example.com" },
  { id: 2, nombre: "Juan Martinez", email: "juan@example.com" },
  { id: 3, nombre: "Maria Lopez", email: "maria@example.com" }
];

export const pedidos = [
  { id: 1001, idUsuario: 1, total: 989.98 },
  { id: 1002, idUsuario: 2, total: 719.97 },
  { id: 1003, idUsuario: 1, total: 249.99 }
];

export const favoritos = [102, 104, 101, 102, 107, 101, 104, 103, 102, 106, 101, 104];
