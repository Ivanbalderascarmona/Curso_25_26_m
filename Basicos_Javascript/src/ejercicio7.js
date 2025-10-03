// # objetos en java script

const usuario = {
    name: "Iván",
    email: "ivan@gmail.com",
    active: true,
};

// * para obtener las claves de un objeto

const claves = Object.keys(usuario); // [name, email, active]

// * Utilidad verificar si las claves estan todas siguiendo un objeto de partida
// #1. Como compruebo que todas las claves existen

function validateValues (obj={}, camposRequeridos) {
    const keys = Object.keys(obj);
    // retorno true o false
    return camposRequeridos.every((campo) => {
        return keys.includes(campo);
    });
};

// # Data:
const dataForm = {name: "Pepe", "active": false};

const esValiodo= validateValues(dataForm, ["name","email", "active"]);

// * para sacar los valores de un objeto: Object.values();

const producto = {
    nombre:"laptop",
    stock:100,
    precio:1100,
    destacado:true,
};

// * array de valores

const valores= Object.values(producto); // [laptop, 100, 1100, true]

// #Verificar si algún valor cumple una condición

const precipitaciones = {
    enero:110,
    febrero:98,
    marzo:120,
    abril:50,
};

// # Algun mes la precipitación es mayor a 100

const mesSuperiorCien= Object.values(precipitaciones)
    .some(precipitacion => precipitacion > 100);


// # Cuantos litros totales han caido en los meses enero-abril

const precipitacionesEneroAbril = Objecto.values(precipitaciones)
    .reduce((litrosTotales, precipitacion)=> Number(litrosTotales)+Number(precipitacion), 0);

// # Calcular la precipitacion maxima

const precipitacionMax = Math.max(...Object.values(precipitaciones));

// * obtener pares [clave,valor] <--- entries()

const configuracion= {
    tema: "Oscuro",
    idioma: "es",
    notificaciones:true,
    volumen:75,
};

const entradas = Object.entries(configuracion);

/* 
    {
        ["tema", "Oscuro"],
        ["idioma", "es"],
        ["notificaciones", true],
        ["volumen", 75]
    }
*/

// todo 

const usuarioBD = {
    name: "Iván",
    password: "xfst20012",
    email: "ivan@gmail.com",
    active: true,
};

// # filtrar. Eliminar los campos sensibles de este object usuarioDB ("password")

Object.entries(usuarioBD).filter()

// destructuring

const {nombre,email} = usuarioBD; // --> const nombre = usuarioBD.nombre; const email = usuarioBD.email;

const data= [1,2,3,4,5];

const [a,b,c] = data; // a=1, b=3, c=[3]

const [a1,b1,,c1] = data; // a=1, b=2, c=[4]

const [a2, b2, ...c2] = data; // a=1, b=2, c=[4,5]

function vData (array){
    const [v1,v2] = array;
    console.log("v1:",v1);
    console.log("v2:",v2);
}
vData([1,2,3,4,5]);

// # crear funcion llamada mostrarPersona. Obtener el username, y las dos primeras redes sociales que el usuario tenga

const usuario3= {
    id:1,
    info: {
        username: "ivanbc",
        redes: ["twitter", "github", "linkedin"]
    },
};

const {info:{username,redes:[r1,r2]}} = usuario3;

/*
username ---> ivanbc
r1 ---> twitter
r2 ---> github
*/

// # obtener el nombre y la edad del siguiente objeto. si no existe edad que guarde el valor 0

const data4 = {
    id:101,
    usuario:{
        perfil:{
            nombre2: "Iván",
            edad: 20,
            direccion:{
                ciudad:"Granada",
                pais:"España"
            },
        },
        activo:true,
    },
};

const {usuario:{perfil:{nombre2,edad=0}}} = data4;

/*
    nombre2 --> "Iván",
    edad ---> 20
*/

// # 


const productos = [
    {
        id: 1,
        nombre: "Laptop",
        precio: 1000,
        fabricante: {
        nombre: "HP",
        pais: "USA",
        contacto: {
            email: "info@hp.com",
            telefono: "+1-555-0123",
        },
        },
        especificaciones: {
        ram: 8,
        cpu: 4,
        },
    },
    {
        id: 2,
        nombre: "Smartphone",
        precio: 700,
        fabricante: {
        nombre: "Samsung",
        pais: "Corea del Sur",
        contacto: {
            email: "contact@samsung.com",
            telefono: "+82-2-555-6789",
        },
        },
        especificaciones: {
        ram: 6,
        cpu: 8,
        },
    },
    {
        id: 3,
        nombre: "Tablet",
        precio: 400,
        fabricante: {
        nombre: "Apple",
        pais: "USA",
        contacto: {
            email: "support@apple.com",
            telefono: "+1-800-555-4321",
        },
        },
        especificaciones: {
        ram: 4,
        cpu: 6,
        },
    },
    {
        id: 4,
        nombre: "Monitor",
        precio: 250,
        fabricante: {
        nombre: "LG",
        pais: "Corea del Sur",
        contacto: {
            email: "info@lg.com",
            telefono: "+82-2-333-7777",
        },
        },
        especificaciones: {
        ram: null,
        cpu: null,
        },
    },
    {
        id: 5,
        nombre: "Impresora",
        precio: 150,
        fabricante: {
        nombre: "Canon",
        pais: "Japón",
        contacto: {
            email: "support@canon.jp",
            telefono: "+81-3-555-2468",
        },
        },
        especificaciones: {
        ram: 1,
        cpu: 1,
        },
    },
    {
        id: 6,
        nombre: "Teclado Mecánico",
        precio: 80,
        fabricante: {
        nombre: "Logitech",
        pais: "Suiza",
        contacto: {
            email: "info@logitech.com",
            telefono: "+41-21-555-9087",
        },
        },
        especificaciones: {
        ram: null,
        cpu: null,
        },
    },
    {
        id: 7,
        nombre: "Mouse Inalámbrico",
        precio: 50,
        fabricante: {
        nombre: "Razer",
        pais: "Singapur",
        contacto: {
            email: "support@razer.com",
            telefono: "+65-555-1212",
        },
        },
        especificaciones: {
        ram: null,
        cpu: null,
        },
    },
    {
        id: 8,
        nombre: "Disco Duro Externo",
        precio: 120,
        fabricante: {
        nombre: "Seagate",
        pais: "USA",
        contacto: {
            email: "help@seagate.com",
            telefono: "+1-800-555-8765",
        },
        },
        especificaciones: {
        ram: null,
        cpu: null,
        capacidad: "1TB",
        },
    },
    {
        id: 9,
        nombre: "Consola de Videojuegos",
        precio: 500,
        fabricante: {
        nombre: "Sony",
        pais: "Japón",
        contacto: {
            email: "support@sony.jp",
            telefono: "+81-3-333-2222",
        },
        },
        especificaciones: {
        ram: 16,
        cpu: 8,
        },
    },
    {
        id: 10,
        nombre: "Smartwatch",
        precio: 200,
        fabricante: {
        nombre: "Xiaomi",
        pais: "China",
        contacto: {
            email: "info@xiaomi.cn",
            telefono: "+86-10-555-9988",
        },
        },
        especificaciones: {
        ram: 2,
        cpu: 2,
        },
    },
];

// # Crear una funcion que extraiga los datos del objeto y me devuelva la siguiente estructura

 // # nombre, fabricante{nombre, contacto}, especificaciones{ram}

 // # Imaginemos un array de prodcutos, usando la nueva especificacion obtener el nombre del producto con mas ram

const extraerData = (producto) => {
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
        fabricante,
        especificaciones
    }
};

const newDataArray = (arrayProducts) => arrayProducts
    .map((product) => extraerData(product));
;
