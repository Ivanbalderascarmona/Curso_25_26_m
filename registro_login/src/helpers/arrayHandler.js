// # Estructura del usuario
/*
    {
        "id": "uuid-generado",
        "username": "nombre_de_usuario",
        "passwordHash": "contraseña_en_hash"
    }
*/

import { uuid } from 'uuid';
import { bcrypt } from 'bcrypt';

const ARRAY_NAME= import.meta.env.VITE_ARRAY_NAME;


/**
 * Esta función registra a un usuario usando la estructura de datos de los arrays. Realiza las correspondientes validaciones y si no exsiste aún el array de usuarios, te crea el array vacío. Si el usuario ya existe salta un error.
 * Muestra un mensaje al registrar a un usuario de manera correcta.
 * @param {string} username - Nombre del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {string} tipo - Que tipo de de estructura usa. Por default es "array"
 */
const registrarUsuarioArray = (username, password, tipo="array") => {ç
    
  // Validaciones de tipo
    if (typeof username !== 'string' || typeof password !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
  // Validar que sea de tipo array
    if (tipoClean.toLowerCase().trim() !== "array") {
        throw new Error("❌ El tipo debe ser 'array'");
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();

    // Inicializar array si no existe
    if (!localStorage.getItem(ARRAY_NAME)) {
        localStorage.setItem(ARRAY_NAME, JSON.stringify([]));
    }

    const usuarios = JSON.parse(localStorage.getItem(ARRAY_NAME));

    // Verificar si el usuario ya existe
    if (usuarios.find(user => user.username.toLowerCase() === usernameClean.toLowerCase())) {
        throw new Error("❌ El usuario ya existe");
    }

    // Crear el nuevo usuario
    const usuario = {
        id: uuid(),
        username: usernameClean,
        passwordHash: bcrypt.hashSync(passwordClean, 10)
    };

    // Agregarlo al array y guardar
    usuarios.push(usuario);
    localStorage.setItem(ARRAY_NAME, JSON.stringify(usuarios));
    console.info("✅ El usuario se ha registrado correctamente.");
};

/**
 * Esta función realiza la acción de loguear a un usuario cuyo usuario y contraseñas se encuientran guardadas en el localStorage. También se necesita que el tipo sea array. Muestra un mensaje al realizar el login de manera correcta
 * @param {string} username - Nombre del usuario a loguearse.
 * @param {string} password - Contraseña del usuario a loguearse.
 * @param {string} tipo - Tipo de dato del usuario. Por defecto "array"
 */
const loginUsuarioArray = (username, password, tipo="array") => {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof password !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
  // Validar que sea de tipo array
    if (tipo.toLowerCase().trim() !== "array") {
        throw new Error("❌ El tipo debe ser 'array'");
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();

    // Verificar que haya usuarios registrados
    if(!localStorage.getItem(ARRAY_NAME)){
        throw new Error("❌ No hay usuarios registrados");
    }
    const usuarios = JSON.parse(localStorage.getItem(ARRAY_NAME));

     // Verificar si el usuario existe
    if (!usuarios.find(user => user.username.toLowerCase() === usernameClean.toLowerCase()) || !usuarios.find(user=>user.password === bcrypt.hashSync(passwordClean, 10))) {
        throw new Error("❌ El usuario no existe");
    }

    console.info("✅ El usuario se ha logueado correctamente.");

}
/**
 * Esta función cambiala la contraseña del usuario si ese usuario existe y la contraseña (pasada como segundo parámetro) coincide con la contraseña actual del usuario. Muestra un mensaje si el cambio de contraseña se ha efectuado.
 * @param {string} username - Nombre del usuario a cambiar su contraseña.
 * @param {string} passwordActual - Contraseña actual del usuario.
 * @param {string} passwordNueva - Contraseña nueva del usuario.
 * @param {string} tipo - Tipo de la estructura de datos. Por default es "map"
 */
const cambiarPasswordArray = (username, passwordActual, passwordNueva, tipo="array")=> {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof passwordActual !== 'string' || typeof tipo !== 'string' || typeof passwordNueva !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
  // Validar que sea de tipo array
    if (tipo.toLowerCase().trim() !== "array") {
        throw new Error("❌ El tipo debe ser 'array'");
    }

    const usernameClean = username.trim();
    const passwordActualClean = passwordActual.trim();
    const passwordNuevaClean = passwordNueva.trim();

    // Verificar que haya usuarios registrados
    if(!localStorage.getItem(ARRAY_NAME)){
        throw new Error("❌ No hay usuarios registrados");
    }
    //Deserializando el array de usuarios y buscando el usuario que queremos
    const usuarios = JSON.parse(localStorage.getItem(ARRAY_NAME));
    const user= usuarios.find(u=>u.username.toLowerCase() === usernameClean.toLowerCase());

    //Verificar que el usuario existe
    if (!user) {
        throw new Error("❌ El usuario no existe");
    }

    //Verificar la contraseña
    if (!bcrypt.compareSync(passwordActualClean, user.passwordHash)) {
        throw new Error("❌ La contraseña actual es incorrecta");
    }


    // Cambiar la contraseña actual
    usuarios.find(user => user.username.toLowerCase() === usernameClean.toLowerCase()).passwordHash = bcrypt.hashSync(passwordNuevaClean, 10);
    localStorage.setItem(ARRAY_NAME, JSON.stringify(usuarios));
    
    console.info("✅ La contraseña se ha cambiado correctamente.");

};