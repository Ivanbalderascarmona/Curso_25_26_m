// * .at <-- acceso con índices negativos

const frutas = ["manzana", "pera", "fresa", "mandarina",];

console.log(frutas.at(-2)); // devuelve "pera"
console.log(frutas.slice(-2)); // devuelve "pera" y "fresa"

//  .splice --> extraer/eliminar partes de un mutando el array original

frutas.splice(1,2, "pera") // <-- elimina dos elementos desde la posicion 1, apartir de un tercer parámetro sustituye por lo que se le introduce
console.log(frutas); 

// * .concat --> concatenar dos o mas arrays sin mutar el array original


console.log(frutas.concat([1,2,3,4,5,6]));

// * Mejor forma de hacer lo mismo usando ... delante del array (se llama spread operator)

const edades = [1,2,3,4,5,6];
const ArrayConcat = [...edades,...frutas];
console.log(ArrayConcat);

// * SET <-- otro tipo de datos formado por datos únicos

const pesos= [4,5,3,2,4,2,4,4,4,4,7,6,5];

const sinDuplicados = [...new Set(pesos)]; // * Muy importante 

// * .reduce <-- (reducir un array a un único valor)
// * Estructura de un reduce
// * pesos.reduce((acumulador, elemento, indice, array) => qui va la lógica, valorInicial);
// * El acumulador, elemento no son opcionales
// * El resto si
// * No muta el array original
                        //* Si son varias lineas se usa {} y return donde suma+peso
pesos.reduce((suma, peso) => suma+peso , 0 );

// #Ejercicios

// # 1. Hacer la suma

pesos.reduce((suma, peso) => suma+peso , 0 );

// # 2. Hacer el productos de todos

pesos.reduce((mult, peso) => mult*peso , 1 );

// # 3. Calcular maximo y minimo

pesos.reduce((max, peso) => peso > max ? peso : max , pesos[0]);
pesos.reduce((min, peso) => peso < min ? peso : min , pesos[0]);

// # 4. Dado un array que sea ["manzana", "platano", "naranja", "manzana", "manzana", "platano", "pera", "pera"] devolverme un objeto clave:valor que me diga nombre de la fruta: numero de veces que aparece

const frutas2=["manzana", "platano", "naranja", "manzana", "manzana", "platano", "pera", "pera"];
/* 
    * {manzana : 3, platano : 2, naranja : 1, pera : 2} datos[frutas] accedes al valor de un objeto usando el nombre de la clave de esa variable fruta
*/
frutas2.reduce((acc, fruta) =>  {
    acc[fruta]= (acc[fruta] || 0) + 1
    return acc;
}, {} );

// # 5. Dado el siguiente array bidimensional [[1,2],[3,4],[5,6]] aplanar dicho array en un array unidimensional

// * array de objetos

const usuarios= [
    {id : 1, name: "Ivan", age: 25, data :{books:100}},
    {id: 2, name: "Jose", age: 30, data :{books:50}},
    {id: 3, name: "Maria", age: 28, data :{books:20}},
    {id: 4, name: "Sara", age: 28, data :{books:20}},
    {id: 5, name: "Carlos", age: 20, data :{books:10}},
    {id: 6, name: "Mario", age: 38, data :{books:0}},

];

// * dame la información del usuario cuyo nombre es Maria no muta el array original

usuarios.find(usuario => usuario.name.toLowerCase() === "maria");

// * dame todos los usuarios cuya edad es superior o igual a 40

usuarios.find(usuario => usuario.age >= 40) || 0; //*   El ?? delvuelve el valor de la izquierda a no ser que sea undefined o null que entonces te devolvera lo de la derecha
console.log(usuarios.find(usuario => Number(usuario.age) >= 40) ?? {});

//* Dado el siguiente array usuarios, devolver un array con solo los nombres de los usuarios que tienen en su biblioteca mas de 20 libros

console.log("Los usuarios con mas de 20 libros son: ",usuarios.reduce((usersBooks, usuario) => (usuario.data.books > 20 && usersBooks.push(usuario.name), usersBooks ), [] ));

//* Obtener el valor promedio total de todos los libros si suponemos un precio medio de 28€

console.log("El promedio total de los libros es: ",usuarios.reduce((priceMedium, usuario) => (usuario.data.books * 28) + priceMedium , 0 ));

//* Decir que usuarios no tienen libros

console.log("Los usuarios con 0 libros son: ",usuarios.reduce((usersBooks, usuario) => (usuario.data.books === 0 && usersBooks.push(usuario.name), usersBooks), []));