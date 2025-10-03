// Ejercicio: Destructuring profundo

import { productos } from "./data/data";
import { extraerData } from "./helpers/myFunctions";






// #--------Inicio de la aplicación--------

const newDataArray = (arrayProducts) => arrayProducts
  .map((product) => extraerData(product));//se puede sustituir por .map(extraerData)

console.log(newDataArray(productos));
