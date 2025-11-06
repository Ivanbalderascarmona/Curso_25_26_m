import { canciones } from "../db/db"
const CATALOGO ="catalogo";
const PLAYLISTS = "playlists";
const guardarMapEnLocalstorage = (clave ,myMap) => {
    if (typeof clave !== "string") {
        throw new Error("La clave debe ser un string");
        
    }
    localStorage.setItem(clave, JSON.stringify(Array.from(myMap)));
}

const sacarDelLocalStorage = (clave) => {
    const datos = localStorage.getItem(clave)
    return datos  
        ? new Map (JSON.parse(datos)) 
        : new Map();
}
function guardarSetenStorage(clave, mySet){
    const arrayDesdeSet= array.from(set);
    localStorage.setItem(clave, JSON.stringify(arrayDesdeSet))
}
function recuperarSetLocalStorage(clave){
    const datos = localStorage.getItem(clave);
    return datos ? new Set(JSON.parse(datos)) : new Set();
}

export function crearCatalogo() {
    const catalogo = new Map();
    
    canciones.forEach(cancion => {

        catalogo.set(cancion.id, {...cancion, 
            historialReproduccion : [] });

    }) ;
    guardarMapEnLocalstorage(CATALOGO, catalogo);
    console.log(`Catalogo creado con ${catalogo.size} canciones.`)

    return catalogo;
}

export function reproducirCancion(idCancion){
    const catalogo = sacarDelLocalStorage(CATALOGO);

    if (!catalogo.has(idCancion)) {
        throw new Error(`No existe la canción con id = ${idCancion}`);
    }

    
    const cancionReproducida = catalogo.get(idCancion);
    cancionReproducida.reproducciones++;
    cancionReproducida.historialReproduccion.push({  
        fecha: new Date().toISOString(), 
        timestamp: Date.now() 
    });

    catalogo.set(idCancion, cancionReproducida);
    guardarMapEnLocalstorage(CATALOGO, catalogo);

    console.log(`Reproduciendo: ${cancionReproducida.titulo} ------ ${cancionReproducida.artista}`);
    console.log(`Repdroducciones totales: ${cancionReproducida.reproducciones}`);

    return cancionReproducida;
}

export function gestionarPlayList() {
    const playLists = sacarDelLocalStorage(PLAYLISTS);
    const playListsConSets= new Map();
    for(const [nombre, ids] of playLists){
        playListsConSets.set(nombre, new Set(ids) )
    }

    function guardarPlayList(){
        guardarSetEnLocalstorage(PLAYLISTS, playListsConSets);
        
    }
    function crear(nombrePlayList){
        if (playLists.has(nombrePlayList)) {
            console.log(`La pleilist ${nombrePlayList} ya existe`)
            return false;
        }
        playLists.set(nombrePlayList,new Set());


        return true;
    }
    function agregar(nombrePlayList, idCancion){
        if (playLists.has(nombrePlayList)) {
            console.log(`La pleilist ${nombrePlayList} ya existe`)
            return false;
        }
        const catalogo= sacarDelLocalStorage(CATALOGO);
        if (!catalogo.has(idCancion)) {
            console.log(`La canción con id : ${idCancion} no se encientra disponible`);
            return false;
        }
        const setIds= playLists.get(nombrePlayList);
        if (setIds.has(idCancion)) {
            console.log(`La cancion con id : ${idCancion} ya se encuentra en su lista ${nombrePlayList} de reproduccion`);
            return false;
        }
        // añadir idCancion al setIds
        setIds.setItem(idCancion);
        const cancion = catalogo.get(idCancion);
        console.log(`La cancion ${cancion.titulo} agregada a la play list ${nombrePlayList}`);
        return true;

    }
    function eliminar(nombrePlayList, idCancion){


    }
    function obtener(){

    }
    function listar(){

    }
    

    const crear = (nombrePlayList) => {

        if (playLists.has(nombrePlayList)) {
            return false;
        }
        playLists.set(nombrePlayList,new Set());

        guardarMapEnLocalstorage(PLAYLISTS,playLists);

        return true;
    }

    const agregar = (nombrePlayList, idCancion) => {
        const playLists = sacarDelLocalStorage(PLAYLISTS);
        const playlist = playLists
            .get(nombrePlayList);
        if (!playlist) {
            throw new Error("La playlist no existe");
        }
        if(!sacarDelLocalStorage(CATALOGO).has(idCancion)){
            throw new Error("La cancion no existe en el catálogo");
        }
        if (playlist.has(idCancion)) {
            return false;
        }
        playlist.add(idCancion);
        playLists.set(nombrePlayList, playlist);
        guardarMapEnLocalstorage(PLAYLISTS, playLists);
        return true;
    }

    const eliminar = (nombrePlayList, idCancion) => {
        const playLists = sacarDelLocalStorage(PLAYLISTS);
        const playlist = playLists
            .get(nombrePlayList);
        if (!playlist) {
            throw new Error("La playlist no existe");
        }
        if (!playlist.has(idCancion)) {
            throw new Error("La canción no está en la playlist");
        }

        const eliminado = playlist.delete(idCancion);
        playLists.set(nombrePlayList, playlist);
        guardarMapEnLocalstorage(PLAYLISTS, playLists);
        return eliminado;
    }

    const obtener = (nombrePlayList) => {
        const playLists = sacarDelLocalStorage(PLAYLISTS);
        const playList = playLists
            .get(nombrePlayList);
        if (!playList) {
            throw new Error(`La PlayList con nombre ${nombrePlayList} no existe.`);
        }
        const catalogo = sacarDelLocalStorage(CATALOGO);
        const idCanciones=Array.from(playList);
        const cancionesPlaylist = idCanciones.map(idCancion =>{
            return catalogo.get(idCancion);
        });
        return cancionesPlaylist;
    }

    const listar = () => {
        const playLists = sacarDelLocalStorage(PLAYLISTS);
        const nombrePlayLists = Array.from(playLists.keys());
        return nombrePlayLists;
    }


    // catalogo, crear funcion (artista) y devuelva el nombre de todas las canciones que tenga dicho artista
    //crear funcion que le pase (max o min) y obtenga ordenadas por el nombre las 5 canciones mas o menos reproducidas
    // crear funcion reset()que ponga todos los contadores de las canciones a 0
    //totalRepdroducciones() que obtenga el total de mi catalogo

    const cancionesPorArtista = (nombreArtista) => {
        const catalogo = sacarDelLocalStorage(CATALOGO);
        const canciones = Array.from(catalogo.values());
        return canciones.filter(cancion => cancion.artista === nombreArtista)
    }

    const cancionesMasoMenosReproducidas = (valor) => {
        const catalogo = sacarDelLocalStorage(CATALOGO);
        let canciones = Array.from(catalogo.values());
        switch(valor.toLowerCase()){
            case 'max' : 
                canciones.sort((a, b) => b.reproducciones - a.reproducciones).slice(0,5);
            break;
            case 'min' :
                canciones.sort((a, b) => a.reproducciones - b.reproducciones).slice(0,5);
            break;
            }
        
        return canciones.sort((a,b) => a.title > b.title);
    }

    const reset = () => {
        const catalogo = sacarDelLocalStorage(CATALOGO);
        const canciones = catalogo.forEach((cancion) => {
            return cancion.id,{
                ...cancion,
                reproducciones : 0
            }
        });
    }

    return {crear, agregar, eliminar, obtener, listar, cancionesPorArtista, cancionesMasoMenosReproducidas, reset};
}