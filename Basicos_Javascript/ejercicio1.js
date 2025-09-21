// declarar las variables

// declarar las funciones

/*
    Descripcion: Funcion que suma dos numeros
    Parámetros:
        -a: numero 1
        -b: numero 2
    Devuelve: la suma de los dos numeros
*/ 
/**
 * Suma dos números y devuelve el resultado.
 * @param {number} [a=0] - primer numeros a sumar con valor por defecto 0
 * @param {number} [b=0] - segundo número a sumar con valor por defecto 0
 * @returns {number} - suma de los dos números
 */
function suma(a=0, b=0){
    return a + b;
}

//inicializar la aplicacion


// Test funcion suma
console.log(suma(2,3));
console.log(suma(2));
console.log(suma());
suma(2,3);