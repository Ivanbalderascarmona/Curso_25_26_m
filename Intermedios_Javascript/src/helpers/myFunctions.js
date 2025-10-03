/**
 * 
 * @param {Object} producto - Objeto Data
 * @returns {Object} Objeto Productos- Objeto con informacion extraida
 */
export const extraerData = (producto) => {
    
    const {
        nombre, 
        fabricante:{
            nombre:nombreFabricante, 
            contacto
        },
        especificaciones:{ ram }
        } = producto;
        
    return {
        nombre,
        nombreFabricante,
        contacto,
        ram
    }
};

// funcion maxRam que al pasar como parametros un array de productos y me devuelva el nombre del producto que tiene la maxima ram

export const maxRam = (arrayProducts) => {
    arrayProducts.map(extraerData).reduce((max, actual,) => {
        ram
    }, 0);
};