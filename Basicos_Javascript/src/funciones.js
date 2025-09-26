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