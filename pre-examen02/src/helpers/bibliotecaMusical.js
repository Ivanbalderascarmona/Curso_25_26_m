import { canciones } from "../db/db"

const CATALOGO = "catalogo";
const PLAYLISTS = "playlists";

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
        listar
    };
}


export {crearCatalogo, reproducirCancion, gestionarPlaylists};
