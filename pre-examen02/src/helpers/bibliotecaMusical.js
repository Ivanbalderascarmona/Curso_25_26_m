import { canciones } from "../db/db"

const CATALOGO = "catalogo";
const PLAYLISTS = "playlists";
const INDICEBUSQUEDA = "indiceBusqueda";

const guardarMapLocalStorage = (clave, myMap) => {
    if (typeof clave !== "string" || !(myMap instanceof Map)) {
        return false;
    }
    const mapSerializado = Array.from(myMap, ([key, value]) => {
        if (value instanceof Set) {
            return [key, Array.from(value)]
        }
        return [key, value];
    })
    localStorage.setItem(clave, JSON.stringify(Array.from(mapSerializado)));
}

const recuperarMapLocalStorage = (clave) => {
    
    if ( typeof clave !== "string") {
        return false;
    }
    const data =localStorage
        .getItem(clave.trim());

    if (!data) {
        return new Map();
    }
    return new Map(JSON.parse(data));
}

const guardarSetLocalStorage = (clave, mySet) => {
    if (typeof clave !== "string" || !(mySet instanceof Set)) {
        return false;
    }
    localStorage.setItem(clave, JSON.stringify(Array.from(mySet)));
}

const recuperarSetLocalStorage = (clave) => {
    
    if ( typeof clave !== "string") {
        return false;
    }
    const data =localStorage
        .getItem(clave.trim());

    if (!data) {
        return new Set();
    }
    return new Set(JSON.parse(data));
}

//##### ---------------------------------------------- Parte 1 ----------------------------------------------

//# Función 1
const crearCatalogo= () => {

    const mapCanciones = new Map();

    canciones.forEach(cancion => {
        mapCanciones.set(cancion.id,
        {
            ...cancion,
            historialReproduccion: []
        }
        )
    });
    guardarMapLocalStorage(CATALOGO, mapCanciones);
    return mapCanciones;
}


//# Función 2
function reproducirCancion(idCancion) {
    const id = Number(idCancion);

    const catalogo = recuperarMapLocalStorage(CATALOGO);
    if (!catalogo) {
        throw new Error("No existe ningún catálogo.");
    }
    if (!catalogo.has(
        id)) {
        throw new Error(`La canción con id = ${id} no se encuentra en el catálogo.`)
    }
    const cancion = catalogo.get(id);
    cancion.reproducciones++;
    cancion.historialReproduccion.push({
        fecha: new Date().toISOString(), 
        timestamp: Date.now()
    });
    catalogo.set(id, cancion);
    guardarMapLocalStorage(CATALOGO, catalogo);

    return cancion;

}

//##### ---------------------------------------------- Parte 2 ----------------------------------------------

//# Función 3
const gestionarPlaylists = () => {
    const playLists = recuperarMapLocalStorage(PLAYLISTS);
    const playListsconSets = new Map();
    for(const [nombre, ids] of playLists){
        playListsconSets.set(nombre, new Set(ids));
    }

    function crear(nombrePlayList){

        const nombre = nombrePlayList.trim();
        if (!nombre) return false;

        if (playListsconSets.has(nombre)) return false;

        playListsconSets.set(nombre, new Set());
        guardarMapLocalStorage(PLAYLISTS,playListsconSets);

        return true;
    }

    function agregar(nombrePlayList, idCancion){
        const nombre = nombrePlayList.trim();
        const id = Number(idCancion);
        const catalogo = recuperarMapLocalStorage(CATALOGO);
        if(!nombre) return false;

        if(isNaN(id)) return false;

        if(!playListsconSets.has(nombre)) return false;

        if(!catalogo.has(id))return false;
        const playList = playListsconSets.get(nombre);

        if(playList.has(id)){
            return false;
        }
        playList.add(id);

        playListsconSets.set(nombre, playList);
        guardarMapLocalStorage(PLAYLISTS, playListsconSets);

        return true;
    }

    function eliminar(nombrePlayList, idCancion){
        const nombre = nombrePlayList.trim();
        const id = Number(idCancion);

        if(!nombre) return false;

        if(isNaN(id)) return false;

        if(!playListsconSets.has(nombre)) return false;

        const playList = playListsconSets.get(nombre);
        if (!playList.has(id)) {
            return false;
        }
        playList.delete(id);

        playListsconSets.set(nombre, playList);
        guardarMapLocalStorage(PLAYLISTS, playListsconSets);

        return true;
    }

    function obtener(nombrePlayList){
        const nombre = nombrePlayList.trim();
        
        if(!nombre) return false;

        if(!playListsconSets.has(nombre)) return false;
        
        const catalogo = recuperarMapLocalStorage(CATALOGO);
        const catalogoArray = Array.from(catalogo.values());
        const playList = playListsconSets.get(nombre);
        
        return catalogoArray.filter(cancion => playList.has(cancion.id));
    }

    function listar() {
        return Array.from(playListsconSets.keys());
    }

    return {
        crear,
        agregar,
        eliminar,
        obtener,
        listar,
        construirIndiceBusqueda
    };
}

//##### ---------------------------------------------- Parte 3 ----------------------------------------------

//# Función 4
/**
 * Función 4: construirIndiceBusqueda() Qué debe hacer: 
 * 1. Recuperar el catálogo de canciones 
 * 2. Crear un Map de índice invertido donde: 
 *      Clave: término de búsqueda (en minúsculas)
 *      Valor: Set con IDs de canciones que contienen ese término 
 * 3. Extraer términos de los siguientes campos: 
 *      titulo (dividir por espacios) 
 *      artista (dividir por espacios)
 *      album (dividir por espacios) 
 *      genero (como término completo) 
 *      año (convertido a string) 
 * 4. Guardar el índice en LocalStorage con clave "indiceBusqueda"
 * 5. Devolver el Map creado 
 */

function construirIndiceBusqueda(){
    const catalogo = recuperarMapLocalStorage(CATALOGO);
    const cancionesArray = Array.from(catalogo.values());
    const indiceBusqueda = new Map();

    cancionesArray.forEach(cancion => {
        const limpiarYDividir = texto =>
            texto
                .toLowerCase()
                .replace(/[^a-z0-9 ]/gi, "")
                .split(" ")
                .filter(Boolean);
        const titulo = limpiarYDividir(cancion.titulo);
        const artista = limpiarYDividir(cancion.artista);
        const album = limpiarYDividir(cancion.album);
        const genero = [cancion.genero.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')];
        const año = [String(cancion.año)];

        const terminos = [...titulo, ...artista, ...album, ...genero, ...año];

        terminos.forEach(termino => {
                if(!indiceBusqueda.has(termino)){
                    indiceBusqueda.set(termino, new Set());
                }
                indiceBusqueda.get(termino).add(cancion.id);
            });
    });

    const indiceArray = Array.from(indiceBusqueda, ([clave, valorSet]) => [clave, Array.from(valorSet)]);
    localStorage.setItem(INDICEBUSQUEDA, JSON.stringify(Array.from(indiceArray)));
    
    return indiceBusqueda;
}

/**
 * Función 5: buscarCanciones(termino, filtros = {}) Qué debe hacer: 
 * 1. Recuperar el índice de búsqueda desde LocalStorage 
 * 2. Buscar el término (convertido a minúsculas) en el índice 
 * 3. Obtener el Set de IDs de canciones 
 * 4. Convertir los IDs en objetos completos usando el catálogo 
 * 5. Aplicar filtros opcionales (si se proporcionan): 
 *      filtros.genero: genero (string)
 *      filtros.añoMin: año mínimo (número) 
 *      filtros.añoMax: año máximo (número) 
 *      filtros.duracionMax: duración máxima en segundos (número) 
 * 6. Ordenar resultados por reproducciones de mayor a menor 
 * 7. Devolver array de canciones que coinciden
 */

function buscarCanciones(termino, filtros = {}){
    const indice = recuperarMapLocalStorage(INDICEBUSQUEDA);
    const terminoClean = termino.trim().toLowerCase();

    if(typeof terminoClean !== "string") throw new Error("El término debe ser una cadena de texto.");
    
    if (!indice.has(terminoClean)) throw new Error(`El término ${terminoClean} no existe en el índice de términos.`);
    
    const setIds = indice.get(terminoClean);
    const catalogo = recuperarMapLocalStorage(CATALOGO);
    const catalogoArray = Array.from(catalogo.values);
    const arrayIds = Array.from(setIds);

    const cancionesTermino = catalogoArray.filter(cancion => arrayIds.has(cancion.id));
    const cancionesFiltro = cancionesTermino.filter(cancion =>{
        if (filtros.genero && typeof filtros.genero === "string") {
            cancion.genero === filtros.genero
        }
        if(filtros.añoMin && !isNaN(filtros.añoMin) ){

        }
    });

}


export {crearCatalogo, reproducirCancion, gestionarPlaylists, construirIndiceBusqueda};
