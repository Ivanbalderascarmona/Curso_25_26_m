// # Crear una funcion llamada initialStorage que reciba un array de usuarios y los guarde en el localStorage

import { ENV } from '../config/env.js';

/**
 * 
 * @param {*} arrayUsuarios 
 */
export const initialStorage = (arrayUsuarios) => {
    localStorage.setItem(ENV.VITE_STORAGE_KEY, JSON.stringify(arrayUsuarios));
    console.info("Usuarios guardados correctamente: ")
}

// # Crear una funcion llamada getUsuarios() que se traiga todos los usuarios que hay almacenados en la clave key

/**
 * 
 * @returns 
 */
export function getUsers() {
    return JSON.parse(localStorage.getItem(ENV.VITE_STORAGE_KEY)) || [];
}

// # Crear una función setUsuario(usuario) y lo guarde en el localStorage en la key del .env
/**
 * 
 * @param {*} usuarios 
 */
export const setUsuario = (user) => {
    
    initialStorage([...getUsers(), user]);
}

