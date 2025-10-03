// # Estas son funciones a tener en cuenta:

// * .find devuelve el primero que encuentre con los parametros pasados

// * .reduce <-- (reducir un array a un único valor)
// * Estructura de un reduce
// * pesos.reduce((acumulador, elemento, indice, array) => qui va la lógica, valorInicial);
// * El acumulador, elemento no son opcionales
// * El resto si
// * No muta el array original
//* Si son varias lineas se usa {} y return donde suma+peso
// pesos.reduce((suma, peso) => suma+peso , 0 );

// * SET <-- otro tipo de datos formado por datos únicos

// const pesos= [4,5,3,2,4,2,4,4,4,4,7,6,5];

// const sinDuplicados = [...new Set(pesos)]; // * Muy importante 

// * Mejor forma de concatenar usando ... delante del array (se llama spread operator)

// const edades = [1,2,3,4,5,6];
// const ArrayConcat = [...edades,...frutas];
// console.log(ArrayConcat);

// * .at <-- acceso con índices negativos

const frutas = ["manzana", "pera", "fresa", "mandarina",];

// console.log(frutas.at(-2)); // devuelve "pera"
// console.log(frutas.slice(-2)); // devuelve "pera" y "fresa"

//  * .slide() extraer partes de un array

// edades.slice(0,2);

//  * .map()

// edades.map((edad) => edad * 2);

//  * .filter()

// edades.filter((edad) => edad >= 18);

// * Operador Ternario

// condicion ? se cumple : no se cumple
// let edad=18;
// edad>=18?alert("Eres mayor de edad"):alert("Eres menor de edad");

// * Nullish Coalescing
// En caso de que esto sea null o undefined ?? se hace esto

// * spread operator
// ...array para convertir un array en un objeto

// * some() -> devuelve true si alguno de los elementos cumple la condición

// * every() -> devuelve true si todos los elementos cumplen la condición

// * findIndex() -> devuelve el indice del array donde se encuentra el objeto o -1 si no lo encuentra

// * includes() -> devuelve true si el array contiene el objeto

// * para obtener las claves de un objeto : Object.keys()

// const claves = Object.keys(usuario); // [name, email, active]

// * para sacar los valores de un objeto: Object.values()

// * obtener pares [clave,valor] <--- entries()


// *destructuring

// const { nombre,email } = usuarioBD; // --> const nombre = usuarioBD.nombre; const email = usuarioBD.email;

// const data= [1,2,3,4,5];

// * const [ a,b,c ] = data; // a=1, b=3, c=[3]

// * const [ a1,b2,,c3 ] = data; // a=1, b=2, c=[4]

// * const [ a2, b2, ...c2 ] = data; // a=1, b=2, c=[4,5]

// * function vData (array){
//     const [ v1,v2 ] = array;
//     console.log("v1:",v1);
//     console.log("v2:",v2);
// }
// vData([1,2,3,4,5]);

// const usuario3= {
//     id:1,
//     info: {
//         username: "ivanbc",
//         redes: ["twitter", "github", "linkedin"]
//     },
// };

// * const {info:{username,redes:[ r1,r2 ]}} = usuario3;

/*
username ---> ivanbc
r1 ---> twitter
r2 ---> github
*/