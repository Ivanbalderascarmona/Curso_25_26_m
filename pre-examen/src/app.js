import { crearCatalogo, reproducirCancion, gestionarPlayList } from "./helpers/bibliotecaMusical";

function app () {
    crearCatalogo();
    reproducirCancion(1);
    reproducirCancion(1);
    reproducirCancion(5);
    reproducirCancion(7);
    reproducirCancion(9);
    reproducirCancion(1);

    const playlists = gestionarPlayList();
    playlists.crear("Rock Classics");
    playlists.crear("Favoritas");

    playlists.agregar("Rock Classics", 1);
    playlists.agregar("Rock Classics", 3);
    playlists.agregar("Rock Classics", 6);

    playlists.agregar("Favoritas", 1);
    playlists.agregar("Favoritas", 2);

    console.log("Playlists disponibles:", playlists.listar());

    const misRocks = playlists.obtener("Rock Classics");
    console.log(`\nPlaylist "Rock Classics" tiene ${misRocks.length}canciones:`);
    misRocks.forEach(cancion => {
        console.log(`  - ${cancion.titulo} (${cancion.artista})`);
    });

    playlists.eliminar("Rock Classics", 1);
    console.log(`\nDespués de eliminar, quedan ${playlists.obtener("Rock Classics").length} canciones`);
}

export default app;