const numeros= [1,2,3,4,5];

// # generar un objeto resumen de mi array que tenga los siguientes campos

/*
    {
        valor: numero_correspondiente,
        posicion:posición dentro del array,
        esUltimo: array_que_me_diga_si_es_el_ultimo (true/false)
    }
*/
const  resumenNumeros=  numeros.map((numero, index, miArray) =>{
    return {
        valor: numero,
        posicion: index,
        esUltimo: index === miArray.length-1
    }
});

console.log(resumenNumeros); // array de objetos mapeados a una estructura dada.

const products = [
    {
        name: "Laptop", price: 1000, stock:5, active: true
    },
    {
        name: "Mouse Logitech", price: 28.56, stock: 0, active: false
    },
    {
        name: "Monitor MSI 24", price: 210.60, stock:10, active:false
    }
];

/*
    Mapeado:
    nombre
    precioOriginal
    precioConIva
    hayStock

*/
const productsWithVat= products.map(product => {
    return{
        precioOriginal: product.price,
        precioConIva: product.price * 1.21,
        hayStock: product.stock > 0
    }
});

// # Filtrame los productos que tienen stock y estan activos

const productsActive= products.filter(product => product.stock > 0 && product.active);

// # Buscar la informacion de todos los Laptop de tipo caseSensitive(no tener en cuenta mayusculas y minusculas)

const infoLaptop = products.filter((product) => product.name.toLowerCase().includes("laptop")
);
console.log(infoLaptop);

// # crear una funcion donde le pases un array de objetos como parametro y como segundo el nombre delobjeto que quieres buscar
/**
 * Esta funcion busca un objeto dentro del array dado mediante el nombre pasado por parámetro.
 * @param {array} - array de objetos
 * @param {string} - nombre del objeto a buscar
 * @returns {array} - array de objetos que tienen el nombre pasado por parámetro
 */
const findProducts = (products, nombreProducto) => products
    .filter(product => product.name.toLowerCase()
        .includes(nombreProducto.toLowerCase())
    );

console.log("El/los producto/s buscado/s es: ",findProducts(products, "mOuSE"));

// # Crear una funcion que le pase como parámetro un array de productos, precio_inicial, precio_final y me devuelva los productos cuyo precio esta en ese rango de valores (sin incluirlos)
/**
 * Esta funcion filtra un array de objetos mediante su precio inicial y su precio final y devuelve los que se encuentren en ese rango.
 * @param {array} - array de productos 
 * @param {number} - precio inicial del rango a buscar 
 * @param {number} - precio final del rango a buscar
 * @returns  {array} - array de productos que esten entre ese rango de valores pasado
 */
const filterPrice= (products = [], precio_inicial=0, precio_final=0) => products
    .filter(product => product.price > precio_inicial && product.price < precio_final
);

console.log("Los productos entre 1000 y 2000 son: ", filterPrice(products, 1000, 2000));

// # version mejorada 

const filterPriceV2= (products = [], precio_inicial=0, precio_final=0) => products
    .filter(product => product.price > precio_inicial && product.price < precio_final
);

// # Modifica findProducts para que además me muestre sólo los que estan activos.

const findProductsV2 = (products=[], nombreProducto="") => products
    .filter(product => product.name.toLowerCase()
        .includes(nombreProducto.toLowerCase() && product.active)
);

// #
const carrito = [
    {
        name: "Laptop", price: 1000, count:5, category: "Electronica"
    },
    {
        name: "Mouse Logitech", price: 28.56, count: 0, category: "Electronica"
    },
    {
        name: "Polo Scalper", price: 150.60, count:2, category: "Ropa"
    },
    {
        name: "Pantalón Stradivarius", price: 45, count:5, category: "Ropa"
    }
];
/**
 * 
 * @autor: Iván Balderas Carmona
 * @param {array} carrito  - Carrito de objetos
 * @param {number} vat(iva) - Iva a aplicar
 * @returns {number} - Total del carrito IVA incluido
 */
const precioTotal = (carrito=[], vat=1.21) => carrito
    .reduce((precio, producto) =>(producto.price * producto.count), 0);

// lo mismo haciendo descuento
const precioTotalV2 = (carrito=[], vat=1.21) => carrito
    .reduce((precio, producto) =>(product.count > 5 
            ? (total+product.price*vat)*0.95 
            : (total+product.price)*vat)
        , 0);

// # Agrupar el carrito por categorias

/*
    {
        Electronica: [
            {
            },
            {
            }
        ],
        Ropa: [
            {
            },
            {
            }
        ]
    }
*/

const productsCategory = (myCart = [], category="") => myCart
    .reduce((groups, product) => {
        const categoryFilter = product.category
        if(!groups[categoryFilter]){
            groups[categoryFilter] = []
        }
        groups[categoryFilter].push(product);
        return group;},{}
    );


const votos = ["Ana", "Pepe", "Ana", "Ana", "Pepe", "Carlos", "Ana", "Pepe", "Ana"];

// {Ana: 5, Pepe: 3, Carlos: 1}

const votosCount = (votos=[]) => {
    return votos.reduce((count, voto) => {
        count[voto] = (count[voto] || 0) + 1;
        return count;
    }, {})
};
console.log(votosCount(votos));


const usuarios= [
    {id : 1, name: "Ivan", age: 25, data :{books:100}, role: "admin"},
    {id: 2, name: "Jose", age: 30, data :{books:50}, role: "user"},
    {id: 3, name: "Maria", age: 28, data :{books:20}, role: "admin"},
]
// # funcion (arrayUsuarios, idBusqueda) -> devuelve el rol que tiene
// # Dado ese objeto usuarios buscar el usuario cuyo ide=2 y obtener que rol tiene

const getRole = (arrayUsers=[], id=[1]) => {
    return arrayUsers.find(user => Number(user.id) === Number(id) ?? user.role);
};

// # Buscar el indice del array donde se encuentra el usuario con id buscado.

const findUserIndex = (arrayUsers=[], id=1) =>  arrayUsers
    .findIndex(user => Number(user.id) === Number(id));

// devuelve -1 si no no lo encuentra o si findIndex devuelve error o no encuentra la accion requerida

// * some() -> devuelve true si alguno de los elementos cumple la condición

const numerosPares= [1,2,3,4,5,6,7,8,9,10];

// # ¿hay numeros pares en ese array?
const hayPares = numerosPares.some(numero => numero % 2 === 0); // devuelve true si hay algun numero par
