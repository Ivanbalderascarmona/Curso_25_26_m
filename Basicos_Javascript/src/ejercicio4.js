// # usos de los arrays
// declaracion:
// const edades = [];
// const frutas = ["pera", "manzana", "fresa"];

//  usando el constructor

// const cp = new Array();
// const cc = new Array("gsgsdfg", "dfwgwrg","egehtehedsgf");

//  añadir elementos
// edades.push(10);//añade al final
// edades.unshift(8);//añade al principio

//  eliminar elementos

// edades.pop();//elimina el ultimo y retorna lo que ha eliminado
// edades.shift();//elimina el primero y retorna lo que ha eliminado

//  * slide() extraer partes de un array

// edades.slice(0,2);

//  * map()

// edades.map((edad) => edad * 2);

//  * filter()

// edades.filter((edad) => edad >= 18);



// # 1. Dado un array de nombres, crear una funcion llamada mayusculas que ponga en mayusculas todos los elementos del array que le paso por parametro

const nombres=["IvAN", "JoSe", "MaRiA"];
/**
 * Esta función recibe un array de strings y devuelve un array de strings en mayusculas
 * @param {array} array de nombresnombres por defecto es un array vacío
 * @returns {array} array de nombres en mayusculas
 */
const mayusculas = (nombres = []) => nombres.map(nombre => nombre.toUpperCase());

// console.log("Este es el array: ",mayusculas(nombres)); 
console.log(`Este es el array: $[mayusculas(nombres)]`); 

// # 2. Crea una funcion llamada precios con iva que al pasarle un array de precios, me los devuelva con el iva incluido iva = 21%
const precios=[10,12,20,30];
/**
 * Esta función recibe un array de números y devuelve un array de números con el iva incluido
 * @param {array} array de precios, como defualt es un array vacío
 * @returns {array} array de precios con el iva incluido
 */
const preciosIva = (precios= []) => precios.map(precio => ((precio*0.21)+precio)); 

console.log("Los precios con iva son: ",preciosIva(precios));

// # 3. Crear una funcion llamada impares cuadrado, que le pase un array de números y me devuelva solo los impares elevados al cuadrado

const numeros = [1,2,3,4,5];
/**
 * Esta función recibe un array de números y devuelve un array de los números impares elevados al cuadrado
 * @param {array} array de números, por defecto es un array vacío
 * @returns {array} array de números impares elevados al cuadrado
 */
const imparesCuadrado = (numeros = 0) => numeros
    .filter(numero => numero % 2 !== 0 )
    .map(impar => impar ** 2);

console.log("Los números impares al cuadrado son: ",imparesCuadrado(numeros));

// # 4. Crear una funcion llamada normalizarEmail que le pase un array de email que pueden llevar espacios al principio y alfinal del email y me quite los espacios al principio y al final

const emails=[" joseignacio@gmail.com","paquitofernandez123@gmail.com "," robertogomez93@gmail.com "];
/**
 * Esta función recibe un array de emails y devuelve un array de emails normalizados
 * @param {array} array de emails, por defecto es un array vacío
 * @returns {array} array de emails normalizados
 */
const normalizarEmail = (emails = []) => emails
    .map(email => email.trim());

console.log("Los correos normalizados son: ", normalizarEmail(emails));

// # 5. Crear una funcion llamada filtrarLongitud, que le pase como parametro un array de nombres, tamaño y me devuelva solo los nombres cuya longitud es mayor o igual al tamaño dado por el parámetro

const nombres2= ["Ivan", "Jorge", "Antonio", "Maritoñi", "Roberto"];
/**
 * Esta función recibe un array de nombres y un tamaño y devuelve un array de nombres filtrados por ese tamaño
 * @param {array} nombres2 - array de nombres, por defecto es un array vacío
 * @param {*} size - tamaño, por defecto es 0
 * @returns 
 */
const filtrarLongitud = (nombres2 = [], size =0) => nombres2
    .filter(nombre2 => nombre2.length >= size );

console.log("Los nombres filtrados con el tamaño mayor o igual a 6 son: ", filtrarLongitud(nombres2,6));

// # 6. Normalizar nombres propios, que le pase como parametro un array de nombres y me los devuelva con la letra de cada palabra en mayuscula

const nombres3=["jose luis", "maria jose", "jose antonio"];
/**
 * 
 * @param {array} nombres3 - array de nombres, por defecto es un array vacío
 * @returns {array} array de nombres normalizados
 */
const normailzarNombresPropios= (nombres3 =[]) => nombres3
    .map(nombre3 => nombre3.split(" ").filter(palabra => palabra !== "")
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" "));

console.log("Los nombres propios normalizados son estos: " + normailzarNombresPropios(nombres3));



