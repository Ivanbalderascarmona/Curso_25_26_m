// # Estructura del usuario
/*
    {
        "id": "uuid-generado",
        "username": "nombre_de_usuario",
        "passwordHash": "contraseña_en_hash"
    }
*/

import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";


const OBJECT_NAME= import.meta.env.VITE_OBJECT_NAME;


export const registrarUsuarioObject = (username, password, tipo="object") => {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof password !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
    // Validar que sea de tipo object
    if (tipo.toLowerCase().trim() !== "object") {
        throw new Error("❌ El tipo debe ser 'object'");
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();

    // Inicializar objeto  
    if (!localStorage.getItem(OBJECT_NAME)) {
        localStorage.setItem(OBJECT_NAME, JSON.stringify({}));
    }

    const usuarios = JSON.parse(localStorage.getItem(OBJECT_NAME));
    
    // Verificar si el usuario ya existe
    if (usuarios[usernameClean]) {
        throw new Error("❌ El usuario ya existe");
    }   

    // Crear el nuevo usuario
    const usuario = {
        id: uuid(),
        username: usernameClean,
        passwordHash: bcrypt.hashSync(passwordClean, 10)
    };
    
    // Agregarlo al objeto y guardar
    usuarios[usernameClean] = usuario;
    localStorage.setItem(OBJECT_NAME, JSON.stringify(usuarios));
    console.info("✅ El usuario se ha registrado correctamente.");

}
/**
 * Esta función realiza la acción de loguear a un usuario cuyo usuario y contraseñas se encuientran guardadas en el localStorage.
 * @param {string} username - Nombre del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} tipo - Tipo de estructura de dato del usuario. Por default es "object".
 */
export const loginUsuarioObject = (username, password, tipo="object") => {
    // Validaciones de tipo
    if(typeof username !== 'string' || typeof password !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }

    // Validar que sea de tipo object
    if(tipo.toLowerCase().trim() !== "object"){
        throw new Error("❌ El tipo debe ser 'object'");
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();

    // Verificar que haya usuarios registrados
    if(!localStorage.getItem(OBJECT_NAME)){
        throw new Error("❌ No hay usuarios registrados");
    }

    const usuarios = JSON.parse(localStorage.getItem(OBJECT_NAME));

    //Verificar si el usuario existe
    if ( !usuarios[usernameClean] || !bcrypt.compareSync(passwordClean, usuarios[usernameClean].passwordHash)){
        throw new Error("❌ El usuario o contraseña son incorrectos.");
    }

    console.info("✅ El usuario se ha logueado correctamente.");

}

/**
 * Esta funcioón realiza la acción de cambiar la contraseña a un usuario existente.
 * @param {string} username - Nombre del usuario.
 * @param {string} passwordActual - Contraseña actual asociada al usuario.
 * @param {string} passwordNueva - Contraseña nueva para el usuario.
 * @param {string} tipo - Tipo de la estructura de datos. Por default es "object"
 */
export const cambiarPasswordObject = (username, passwordActual, passwordNueva, tipo="object") => {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof passwordActual !== 'string' || typeof passwordNueva !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
    // Validar que sea de tipo object
    if (tipo.toLowerCase().trim() !== "object") {
        throw new Error("❌ El tipo debe ser 'object'");
    }

    const usernameClean = username.trim();
    const passwordActualClean = passwordActual.trim();
    const passwordNuevaClean = passwordNueva.trim();

    // Verificar que haya usuarios registrados
    if(!localStorage.getItem(OBJECT_NAME)){
        throw new Error("❌ No hay usuarios registrados");
    }

    //Deserializando el objecto
    const usuarios = JSON.parse(localStorage.getItem(OBJECT_NAME));
    const user = usuarios[usernameClean];

    //Verificar que el usuario existe
    if (!user) {
        throw new Error("❌ El usuario no existe");
    }

    //Verificar la contraseña
    if (!bcrypt.compareSync(passwordActualClean, user.passwordHash)) {
        throw new Error("❌ La contraseña actual es incorrecta");
    }

    // Cambiar la contraseña actual
    usuarios[usernameClean].passwordHash = bcrypt.hashSync(passwordNuevaClean, 10);
    localStorage.setItem(OBJECT_NAME, JSON.stringify(usuarios));
    
    console.info("✅ La contraseña se ha cambiado correctamente.");
    
}