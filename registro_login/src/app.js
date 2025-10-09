import { registrarUsuarioArray, loginUsuarioArray, cambiarPasswordArray } from "./helpers/arrayHandler.js";
import { registrarUsuarioObject, loginUsuarioObject, cambiarPasswordObject } from "./helpers/objectHandler.js";
import { registrarUsuarioMap, loginUsuarioMap, cambiarPasswordMap } from "./helpers/mapHandler.js";

registrarUsuarioArray("ana","ana1234","array");
loginUsuarioArray("ana","ana1234","array");
cambiarPasswordArray("ana","ana1234","ana5","array");

console.log("Usuarios guardados:", JSON.parse(localStorage.getItem(import.meta.env.VITE_ARRAY_NAME)));

registrarUsuarioObject("pepe","pepe1234","object");
loginUsuarioObject("pepe","pepe1234","object");
cambiarPasswordObject("pepe","pepe1234","pepe5","object");

console.log("Usuarios guardados:",JSON.parse(localStorage.getItem(import.meta.env.VITE_OBJECT_NAME)));

registrarUsuarioMap("juan","juan1234","map");
loginUsuarioMap("juan","juan1234","map");
cambiarPasswordMap("juan","juan1234","juan5","map");

console.log("Usuarios guardados:",JSON.parse(localStorage.getItem(import.meta.env.VITE_MAP_NAME)));
