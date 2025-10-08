// #importaciones 


import { dbTareas } from "./db/db";
import getTareas from "./helpers/tareas";

const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;


// # inicio de la aplicación

rellenarLocalStorage(dbTareas, Text_Key);
getTareas(Text_Kay);