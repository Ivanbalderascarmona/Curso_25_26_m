import { canciones } from "../db/db"

const CATALOGO = import.meta.env.VITE_CATALOGO;
const PLAYLISTS = import.meta.env.VITE_PLAYLISTS;
const INDICEBUSQUEDA = import.meta.env.VITE_INDICEBUSQUEDA;

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

    if(typeof termino !== "string") throw new Error("El término debe ser una cadena de texto.");

    const terminoClean = termino.trim().toLowerCase();

    
    
    if (!indice.has(terminoClean)) throw new Error(`El término ${terminoClean} no existe en el índice de términos.`);
    
    const setIds = indice.get(terminoClean);
    const catalogo = recuperarMapLocalStorage(CATALOGO);
    const catalogoArray = Array.from(catalogo.values()) || [];
    const arrayIds = Array.from(setIds) || [];

    const cancionesTermino = catalogoArray
        .filter(cancion => arrayIds.includes(cancion.id));
    const cancionesFiltro = cancionesTermino
        .filter(cancion =>{
            let cumple = true;
            if (filtros.genero && typeof filtros.genero === "string") {
                cumple = cumple && cancion.genero === filtros.genero;
            }
            if(filtros.añoMin && !isNaN(filtros.añoMin) ){
                cumple = cumple && cancion.año >= filtros.añoMin;
            }
            if(filtros.añoMax && !isNaN(filtros.añoMax)){
                cumple = cumple && cancion.año <= filtros.añoMax;
            }
            if (filtros.duracionMax && !isNaN(filtros.duracionMax)) {
                cumple = cumple && cancion.duracion <= filtros.duracionMax;
            }
            return cumple;
        })
        .sort((a,b) => b.reproducciones - a.reproducciones);

    return cancionesFiltro;

}

//##### ---------------------------------------------- Parte 4 ----------------------------------------------

//# Función 6
/**
 *  Función 6: generarEstadisticasMusicales()
 *  Qué debe hacer:
 *  1. Recuperar el catálogo completo desde LocalStorage
 *  2. Analizar todos los datos y calcular:
 *  a) totalCanciones: cantidad total de canciones en el catálogo
 *  b) duracionTotal: suma de todas las duraciones convertida a minutos (con 2 decimales)
 *  c) cancionMasReproducida: objeto con la canción que tiene más reproducciones
 *  d) generosPorCantidad: objeto con formato { "Rock": 5, "Pop": 3, "Hip-Hop": 1 }
 *  e) artistasUnicos: cantidad de artistas diferentes (usa Set para contar)
 *  f) añoPromedio: año promedio de todas las canciones (redondeado)
 *  g) distribucionDecadas: objeto que agrupa canciones por década
 *   { 
 *      "1970s": 3, 
 *       "1980s": 2, 
 *       "1990s": 2, 
 *      "2000s": 2, 
 *       "2010s": 1 
 *   }
 *  3. Devolver un objeto con todas estas estadísticas
 *  Pistas:
 *  Para las décadas: Math.floor(año / 10) * 10 + "s"
 *  Usa reduce() para calcular sumas y promedios
 *  Usa Math.max() con spread operator para encontrar máximos
 */
function generarEstadisticasMusicales(){
    const catalogo = recuperarMapLocalStorage(CATALOGO);
    const arrayCatalogo = Array.from(catalogo.values());

    if (arrayCatalogo.length === 0) {
        return {
            totalCanciones: 0,
            duracionTotal: 0,
            cancionMasReproducida: null,
            generosPorCantidad: {},
            artistasUnicos: 0,
            añoPromedio: 0,
            distribucionDecadas: {}
        };
    }

    const totalCanciones = arrayCatalogo.length;
    const duracionTotal = Number((arrayCatalogo
        .reduce((duracionTotal, cancion) => duracionTotal += cancion.duracion,0) / 60).toFixed(2));
        
    const cancionMasReproducida = arrayCatalogo
        .reduce((max, cancion) => cancion.reproducciones > max.reproducciones ? cancion : max , arrayCatalogo[0]);

    const generosPorCantidad = {};
    const artistasUnicos=new Set();
    
    arrayCatalogo.forEach(cancion => {
        generosPorCantidad[cancion.genero] = (generosPorCantidad[cancion.genero] || 0) + 1;
        artistasUnicos.add(cancion.artista);
    });
    
    const añoPromedio = Math.round(arrayCatalogo
        .reduce((sumaAños, cancion) => sumaAños += cancion.año, 0) / totalCanciones);

    const distribucionDecadas = {};
    arrayCatalogo.forEach(cancion => {
        const decada = Math.floor(cancion.año / 10) * 10 + "s"
        distribucionDecadas[decada] = (distribucionDecadas[decada] || 0) + 1;
    });

    return {
        totalCanciones,
        duracionTotal,
        cancionMasReproducida,
        generosPorCantidad,
        artistasUnicos: artistasUnicos.size,
        añoPromedio,
        distribucionDecadas
    }
}


function generarRecomendaciones(idCancionBase, cantidad = 3){
    const idCancion=Number(idCancionBase);
    const cantidadCanciones = Number(cantidad);
    const catalogo = recuperarMapLocalStorage(CATALOGO);
    const arrayCatalogo = Array.from(catalogo.values());

    if(!catalogo.has(idCancion)) throw new Error("La cancion no existe en el catálogo");
    const cancionBase = catalogo.get(idCancion);
    const cancionesSimilares = arrayCatalogo.map(cancion => {
        let puntos = 0;
        const razones = [];
        if(cancionBase.artista === cancion.artista){
            puntos += 5;
            razones.push("Mismo artista");
        }
        if(cancionBase.genero === cancion.genero){
            puntos += 3;
            razones.push("Mismo genero");
        }
        if(cancion.año <= cancionBase.año + 5 && cancion.año >= cancionBase.año - 5){
            puntos += 2;
            razones.push("Mismo rango de fecha de lanzamiento");
        }
        if(cancion.duracion <= cancionBase.duracion + 60 && cancion.duracion >= cancionBase.duracion - 60){
            puntos += 1;
            razones.push("Mismo rango de duracion");
        }
        return {
            cancion: {
                ...cancion
            },
            puntuacion: puntos,
            razones
        }
    })
    .filter(cancion => cancion.cancion.id!== idCancion).sort((a,b) => b.puntuacion - a.puntuacion).slice(0,cantidadCanciones);
    return cancionesSimilares;
    
}


export {crearCatalogo, reproducirCancion, gestionarPlaylists, construirIndiceBusqueda, buscarCanciones, generarEstadisticasMusicales, generarRecomendaciones };
