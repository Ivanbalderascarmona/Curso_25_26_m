// # Primitivos en typeScript

// # 1. String
let nombre: string = "Iván BC";
let cp: string = "1803";
let mensaje: string = `Bienvenido D/Dña ${nombre} ----> cp: ${cp}`;

function procesarTexto (texto: string):string {
    return texto.trim().toUpperCase();
}

console.log(procesarTexto(mensaje));

let saludo = "Bienvenido";//declaracion con inferencia de tipos
console.log(saludo);


// # 2. Number
// #Crear una funcion llamada calcularPrecioFinal(precio, impuesto, descuento) retorna el precio final con el impuesto y descuento aplicados

function calcularPrecioFinal(precio:number, impuesto:number, descuento:number):number {
    return precio * (1+(impuesto /100)) * (1-(descuento /100)); // 21
}

console.log(calcularPrecioFinal(80, 21, 3));

// #Cualquier tipo any (No usar siempre que se pueda)
// # uncion que verifique que lo que pase por parametro es un numero
// # No es infinito, !isNaN 


function esNumero(numero:any):boolean {
    return typeof numero === "number" && isFinite(numero) && !isNaN(numero);
}

esNumero("3");


// ej Calcular el promedio total de los elementos de un array de números

function calcularPromedio(numeros:number[]):number {
    if(numeros.length === 0){
        throw new Error("No se puede calcular el promedio de un array vacío.");
    }
    const suma:number = numeros.reduce((acc, numero) => acc+numero,0);
    return suma;
}

function calcularExtremos(numeros:number[]): {max: number, min:number} {
    if(numeros.length === 0){
        throw new Error("No se puede calcular el promedio de un array vacío.");
    }
    const max:number =Math.max(...numeros);
    const min:number =Math.min(...numeros);

    return {max, min};

}


// # 3. Booleanos


// ej Comprobar si un email es correcto o no

// Es validoEmail(string):boolean el . y el espacio son caractéres especiales
// hay que escaparlos con \. \s

function esEmailValido(email:string):boolean {
    // ibalcar2404@gmail.com
    const emailRegex : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

esEmailValido("aaaaa@aaaa@aaa.com");


// # interface Tipo de dato generado por el usuario para una determinada situacion

interface permisosUsuario {
    puedeLeer: boolean,
    puedeEscribir: boolean,
    puedeBorrar: boolean,
}

// ej Crear funcion llamada obtenerPermisos que dependiendo de si es admin, invitado o usuario, cambie los 
// ej permisos de la interfaz

type tipoUsuario = "invitado" | "usuario" | "administrador";

// #Type permite crear un tipo de dato entre unos valores dados

function obtenerPermisos (usuario: tipoUsuario):permisosUsuario  {
    switch (usuario) {
        case "invitado":
            return {
                puedeLeer: true,
                puedeEscribir: false,
                puedeBorrar: false,
            }

        case "usuario":
            return {
                puedeLeer: true,
                puedeEscribir: true,
                puedeBorrar: false,
            }

        case "administrador":
            return {
                puedeLeer: true,
                puedeEscribir: true,
                puedeBorrar: true,
            }
    
        default:
            return {
                puedeLeer: false,
                puedeEscribir: false,
                puedeBorrar: false,
            }
    }
}

obtenerPermisos("usuario");



// # 4. NULL UNDEFINED

let posibleNombre : string | null = "Invitado" ;

let posibleNombreIndefinido : string | undefined = undefined;



// # Arrow function

const duplicar = (numero:number):number => {
    return numero * 2;
}

// ej crear una funcion que le pase como parametro un array de objetos y me devuelva los usuarios mayores de edad

interface Usuario {
    nombre: string;
    edad: number;
}


const usuarios: Usuario[] = [
    { nombre: "ana", edad: 34 },
    { nombre: "pedro", edad: 14 },
    { nombre: "jose", edad: 18 },
    { nombre: "ivan", edad: 19 },
    { nombre: "sara", edad: 12 },
];

const mayoresEdad = (usuarios: Usuario[]): Usuario[] => {
    return usuarios.filter((usuario) => usuario.edad >= 18);
};

console.log(mayoresEdad(usuarios));



const misNumeros : number[] = [3, -4, 1, 6, -9, 12, 0, -15, 7];
// # Funcion procesarNumeros que cree devuelva un array de números sólo positivos, 
// # multiplicados por 2 y ordenados de menor a mayor
const procesarNumeros = (numeros: number[]):number[] => {
    return numeros
    .filter(numero => numero >= 0)
    .map(numero => numero * 2)
    .sort((a, b) => b - a);
};

// ej Crea una funcion que genere un map con la siguiente estructura


interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

const clientes: Cliente[] = [
    { id: 1, nombre: "Ana García", email: "ana.garcia@example.com", telefono: "+34 600 123 456" },
    { id: 2, nombre: "Pedro López", email: "pedro.lopez@example.com", telefono: "+34 611 234 567" },
    { id: 3, nombre: "Lucía Torres", email: "lucia.torres@example.com", telefono: "+34 622 345 678" },
    { id: 4, nombre: "Javier Ruiz", email: "javier.ruiz@example.com", telefono: "+34 633 456 789" },
    { id: 5, nombre: "Sara Fernández", email: "sara.fernandez@example.com", telefono: "+34 644 567 890" },
    { id: 6, nombre: "Iván Gómez", email: "ivan.gomez@example.com", telefono: "+34 655 678 901" },
    { id: 7, nombre: "Marta Sánchez", email: "marta.sanchez@example.com", telefono: "+34 666 789 012" },
    { id: 8, nombre: "Diego Castro", email: "diego.castro@example.com", telefono: "+34 677 890 123" },
    { id: 9, nombre: "Elena Martín", email: "elena.martin@example.com", telefono: "+34 688 901 234" },
    { id: 10, nombre: "Carlos Pérez", email: "carlos.perez@example.com", telefono: "+34 699 012 345" },
];

/* Estructura del map a generar
    {
        idUsuario : {
            nombre: string,
            email: string,
            telefono: string,
        }
    }
*/

function generarMapaClientes(clientes: Cliente[]): Map<number, {nombre:string, email:string, telefono:string}> {
    

    return
}


// Ejercicios 
// crear una calculadora typada que realice las 4 operaciones basicas para ello partimos de una interfaz
// llamada operacion formada por tipo con 4 opciones "suma" | "resta" | "multiplicacion" | "division"  y 
// operando 1 y operando 2
// funcion llamada calculadora que recibe una operacion de tipo operacion y devuelve segun el tipo el calculo 
// de los dos operandos
// probar con 10 5 y 10 0

// ¿se podria ampliar a otras operaciones?