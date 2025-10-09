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


const MAP_NAME= import.meta.env.VITE_MAP_NAME;

/**
 * Esta función registra a un usuario donde se le pasan como parámetros el nombre, contraseña y tipo de dato del usuario. Devuelve un mensaje si se ha podido registrar correctamentey sino devuelve el mensaje de error correspondiente.
 * @param {string} username - Nombre del usuario a registrar
 * @param {string} password - Contraseña del usuario a registrar
 * @param {string} tipo - Tipo de dato del usuario. Por default es "map"
 */
export const registrarUsuarioMap = (username, password, tipo="map") => {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof password !== 'string' || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
    // Validar que sea de tipo map
    if (tipo.toLowerCase().trim() !== "map") {
        throw new Error("❌ El tipo debe ser 'map'");
    }

    const usernameClean = username.trim();
    const passwordClean = password.trim();
    
    // Inicializar mapa si no existe
    if (!localStorage.getItem(MAP_NAME)) {
        localStorage.setItem(MAP_NAME, JSON.stringify([]));
    }
    //Deserializar del localStorage
    const usuarios = new Map(JSON.parse(localStorage.getItem(MAP_NAME)));

    // Verificar si el usuario ya existe
    if (usuarios.has(usernameClean)) {
        throw new Error("❌ El usuario ya existe");
    }

    // Crear el nuevo usuario
    const usuario = {
        id: uuid(),
        username: usernameClean,
        passwordHash: bcrypt.hashSync(passwordClean, 10)
    };

    // Agregarlo al mapa y guardar
    usuarios.set(usernameClean, usuario);
    localStorage.setItem(MAP_NAME, JSON.stringify(Array.from(usuarios.entries())));
    console.info("✅ El usuario se ha registrado correctamente.");

}

/**
 * Esta función loguea a un usuario cuyo nombre y contraseña se han pasado como parámetros. Si se realiza con éxito devuelve un mensaje de que se ha logrado, si ocurre cualquier error se muestra un mensaje con el error.
 * @param {string} username - Nombre del usuario que está haciendo login.
 * @param {string} password - Contraseña del usuario al que se desea acceder.
 * @param {string} tipo - Tipo de estructura de datos del usuario. Por defecto es "map"
 */
export const loginUsuarioMap = (username, password, tipo="map") => {
    // Validaciones de tipo
    if (typeof username !== 'string' || typeof password !== 'string'  || typeof tipo !== 'string'){
        throw new Error("❌ Datos inválidos");
    }
    //Validar que sea de tipo map
    if (tipo.toLowerCase().trim() !== "map") {
        throw new Error("❌ El tipo debe ser 'map'");
    }
    const usernameClean = username.trim();
    const passwordClean = password.trim();

    //Comprobar que hay usuarios y deserializar si los hay
    if(!localStorage.getItem(MAP_NAME)){
        throw new Error("❌ No hay usuarios registrados");
    }

    //Deserializar Map
    const usuarios = new Map(JSON.parse(localStorage.getItem(MAP_NAME)));

    //Comprobar que el usuario existe y a contraseña es correcta
    if (!usuarios.has(usernameClean) || !bcrypt.compareSync(passwordClean, usuarios.get(usernameClean).passwordHash)) {
        throw new Error("❌ El usuario o contraseña incorrectos.");
    }

    console.info("✅ El usuario se ha logueado correctamente.");
}

/**
 * Esta función realiza la acción de cambiar la contraseña de un usuario
 * @param {string} username - Nombre del usuario
 * @param {string} passwordActual - Contraseña actual asociada al usuario
 * @param {string} passwordNueva - Contraseña que se  quiere poner
 * @param {string} tipo - Tipo de la estructura de datos. Por default es "map"
 */
export const cambiarPasswordMap = (username, passwordActual, passwordNueva, tipo="map") => {
    // Validación de tipo
    if (typeof username !== "string" || typeof passwordActual !== "string" || typeof passwordNueva !== "string" || typeof tipo !== "string" ){
        throw new Error("❌ Datos inválidos");
    }

    // Validar que sea de tipo array
    if(tipo.toLowerCase().trim() !== "map"){
        throw new Error("❌ El tipo debe ser 'map'");
    }

    const usernameClean = username.trim();
    const passwordActualClean = passwordActual.trim();
    const passwordNuevaClean = passwordNueva.trim();

    // Deserializar map
    const usuarios = new Map(JSON.parse(localStorage.getItem(MAP_NAME)));

    //Comprobar que el usuario existe
    if(!usuarios.has(usernameClean) || !bcrypt.compareSync(passwordActualClean, usuarios.get(usernameClean).passwordHash)){
        throw new Error("❌ El usuario o contraseña incorrectos.");
    }

    usuarios.set(usernameClean,usuarios.get(usernameClean).passwordHash = bcrypt.hashSync(passwordNuevaClean, 10));
    localStorage.setItem(MAP_NAME, JSON.stringify(Array.from(usuarios.entries())));

    console.info("✅ Se ha cambiado la contraseña correctamente.");
};