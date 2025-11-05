import { crearCatalogo, reproducirCancion, gestionarPlaylists} from "./helpers/bibliotecaMusical";

const app = () => {
    console.log("Bienvenido a la app")

    const catalogo = crearCatalogo(); 
    console.log(`Catálogo creado con ${catalogo.size} canciones`);
    try { 
        let cancion = reproducirCancion(1); 
        console.log(`Reproduciendo: ${cancion.titulo} - ${cancion.artista}`); 
        console.log(`Total reproducciones: ${cancion.reproducciones}`); 
        cancion = reproducirCancion(1); // Segunda reproducción 
        console.log(`Total reproducciones: ${cancion.reproducciones}`);
        reproducirCancion(999); // ID que no existe 
    } catch (error) { 
        console.error(`Error: ${error.message}`); 
    } 
    const playlists = gestionarPlaylists();
    playlists.crear("Rock Classics");
    playlists.crear("Favoritas");

    playlists.agregar("Rock Classics", 1);
    playlists.agregar("Rock Classics", 3);
    playlists.agregar("Rock Classics", 6);

    playlists.agregar("Favoritas", 1);
    playlists.agregar("Favoritas", 2);

    console.log("Playlists disponibles:", playlists.listar());

    const misRocks = playlists.obtener("Rock Classics");
    console.log(`\nPlaylist "Rock Classics" tiene ${misRocks.length} canciones:`);
    misRocks.forEach(cancion => {
        console.log(`  - ${cancion.titulo} (${cancion.artista})`);
    });

    playlists.eliminar("Rock Classics", 1);
    console.log(`\nDespués de eliminar, quedan ${playlists.obtener("Rock Classics").length} canciones`);
}
export default app;