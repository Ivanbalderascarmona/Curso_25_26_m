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


function saludar(nombreUsuario){
    //return `Bienvenido/a ${nombreUsuario}`;
     return `Bienvenidoo/a ${nombreUsuario ?? "Usuario"}`;
}


let nombre="ivan";
console.log(saludar(nombre));
//inicializar la aplicacion


// Test funcion suma

/*console.log(`La suma de 2 + 3 es : ${suma(2,3)}`);
console.log(suma(2));
console.log(suma(0,3));

//Operador Ternario
// condicion ? se cumple : no se cumple
let edad=18;
edad>=18?alert("Eres mayor de edad"):alert("Eres menor de edad");

// Nullish Coalescing
// En caso de que esto sea null o undefined ?? se hace esto
*/

//crear funcion aprobadps con param number y diga si esta aprobado o no. crear una version 2.0 que si le paso un numero >= 9 me diga sobresaliente
//si esta entre 5 y 9 aprobado y >5 suspenso. 

// function aprobado(nota){
//     return nota >= 5 ? "Aprobado" : "Suspenso";
// }

// const aprobados = (nota=0) => {
//     return nota >= 5 ? "Aprobado" : "Suspenso";
// }

const aprobados = (nota =0) => nota >=5 ? "Aprobado" : "Suspenso";
const aprobadosv2 = (nota =0) => (nota >=9 ? "Sobresaliente" : nota >=5 ? "Aprobado" : "Suspenso") ;

console.log(aprobadosv2(5));

