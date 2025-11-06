import { pedidos, productos, usuarios } from '../db/data';

const crearPerfilUsuario = (idUsuario) => {
  const usuario = usuarios.find(user => user.id === Number(idUsuario));
  if (!usuario) {
    throw new Error(`Usuario con id ${idUsuario} no encontrado`);
  }

  const {id, nombre, ciudad, email, edad, hobbies} = usuarios.find(user => user.id === Number(idUsuario));
  
  const pedidosUsuario = pedidos.filter(p => p.idUsuario === Number(idUsuario));

  const totalCompras = pedidosUsuario.length;

  const totalGastado = pedidosUsuario.reduce((total, pedido) => {
    const subTotal = pedido.productos.reduce((suma, producto) => suma + (producto.precioUnitario * producto.cantidad),0);

    return total + subTotal + (pedido.costeEnvio ?? 0) ;
  }, 0);

  const categorias = [];

  pedidosUsuario.forEach((pedido) => {
    pedido.productos.forEach((producto) => {
      const productoInfo = productos.find(p => p.id === producto.idProducto);
      if(productoInfo && productoInfo.categoria){
        categorias.push(productoInfo.categoria);
      }
    });
  });
  
  const categoriaCount = categorias.reduce((total, cat) => {
    total[cat] = (total[cat] || 0) + 1 ;
    return total;
  },0) ;

  const categoriaFavorita = Object.keys(categoriaCount)
    .reduce((a,b) => categoriaCount[a] > categoriaCount[b] ? a : b , categorias[0] || 'Sin datos');

  const ticketMedio = totalGastado / totalCompras;

  const perfil = {
    id,
    nombre,
    ciudad,
    email,
    edad,
    hobbies,
    stats: {
      totalCompras,
      totalGastado,
      categoriaFavorita,
      ticketMedio 
    }};

  const perfiles = new Map();
  perfiles.set(idUsuario, perfil);

  localStorage.setItem('perfiles_usuarios',JSON.stringify(Object.fromEntries(perfiles)));

  return perfil;
};

const encontrarUsuariosSimilares = (idUsuario, limite = 3) => {

  const perfilesGuardados = JSON.parse(localStorage.getItem('perfiles_usuarios'));
  if(!perfilesGuardados) return [];

  const perfilesUsuarios = Object.values(perfilesGuardados);

  const usuarioPrinc = perfilesUsuarios.find(u => u.id === Number(idUsuario));

  if (!usuarioPrinc) {
    throw new Error('Usuario no encontrado');
  }

  const usuariosSimilares = perfilesUsuarios.filter(usuarios => usuarios.id !== usuarioPrinc.id).map(user => {
    let puntos = 0;
    if (user.ciudad === usuarioPrinc.ciudad) {
      puntos += 30;
    }
    if (user.hobbies && usuarioPrinc.hobbies) {
      const hobbiesComunes = user.hobbies.filter(h => {
        usuarioPrinc.hobbies.includes(h);
        puntos += hobbiesComunes.length * 10; 
      });
    }
    return { ...user, puntos };
  })
    .sort((a,b) => b.puntos - a.puntos)
    .slice(0,limite);
  
  return usuariosSimilares;
};



const generarRecomendaciones = (idUsuario, cantidad = 5) => {
  const usuariosSimilares = encontrarUsuariosSimilares(idUsuario);
  const productosComprados = [];

  usuariosSimilares.forEach(user => {
    const pedidosUsuario = pedidos.filter(pedido => pedido.idUsuario === user.id);
    pedidosUsuario.forEach(pedido => {
      pedido.productos.forEach(producto => {
        const infoProducto = productos.find(p => producto.id === p.idProducto);
        if (infoProducto && !productosComprados.some(p => p.id === infoProducto.id)) {
          productosComprados.push(infoProducto);
        }
      });
    });
  });
  return productosComprados.slice(0,cantidad);
};

const testEjercicio03 = () => {
  const perfil = crearPerfilUsuario(1);
  console.log('Perfil creado para:', perfil.nombre);
  console.log('Total compras:', perfil.stats.totalCompras);
  console.log('Categoría favorita:', perfil.stats.categoriaFavorita);

  const similares = encontrarUsuariosSimilares(1, 3);
  console.log('Usuarios similares encontrados:', similares.length);
  similares.forEach(sim => {
    console.log(`${sim.nombre} - Similitud: ${sim.puntuacion}%`);
  });

  const recomendaciones = generarRecomendaciones(1, 3);
  console.log('Recomendaciones generadas:', recomendaciones.length);
  recomendaciones.forEach(rec => {
    console.log(`${rec.nombre} - ${rec.categoria}`);
  });
};

export default testEjercicio03;