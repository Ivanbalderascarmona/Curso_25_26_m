
export function createImageCard(image, onImageClick, onFavoriteToggle) {

    // añadir la propiedad isFavorite si no existe
    image.isFavorite = image.isFavorite ?? false;


    // # contenedor principal
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative";
    card.dataset.imageId = image.id;

    // imagen
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.title;
    img.className = "w-full h-64 object-cover group-hover:opacity-90 transition-opacity";
    // img.onerror = () => {
    //     img.src = "Aqui iría una url de una imagen que simbolice no disponible";
    // }
    

    // gestionar corazon de favorito
    const favIcon = document.createElement("div");
    favIcon.className = "absolute top-3 right-3 text-2xl select-none transition-transform group-hover:scale-110";
    favIcon.textContent = image.isFavorite ? "❤️" : "🤍";

    favIcon.onclick = (e) => {
        e.stopPropagation();
        image.isFavorite = !image.isFavorite;
        favIcon.textContent = image.isFavorite ? "❤️" : "🤍";
        if (onFavoriteToggle) {
            onFavoriteToggle(image);
        }
    }

    // informacion de la imagen
    const infoContainer = document.createElement("div");
    infoContainer.className = "p-4 bg-white";

    const title = document.createElement("h3");
    title.className = "text-lg text-gray-600 font-bold  mb-2";
    title.textContent = image.title;


    const author = document.createElement("p");
    author.className = "font-semibold text-sm text-gray-600";
    author.textContent = `Realizado por ${image.author}`;

    infoContainer.appendChild(title);
    infoContainer.appendChild(author);

    // introducir todo en card
    card.appendChild(img);
    card.appendChild(favIcon);
    card.appendChild(infoContainer);
    

    // evento de la tarjeta
    card.onclick = () => {
        if (onImageClick) onImageClick(image); // recuerda la sustituiré por onImageClick
    }

    // retornar el componente
    return {
        element: card,
        // aqui iran las funciones
        // isFavorite <-- es favorita la imagen
        isFavorite: () => image.isFavorite,

        // setFavorite <-- marca la imagen como favorita
        setFavorite: (value) => {
            image.isFavorite = value;
            favIcon.textContent = value ?  "❤️" : "🤍";
            if (onFavoriteToggle) {
                onFavoriteToggle(image);
            }
        },
    };
}

export function createImageGrid(images, onImageClick, onFavoriteToggle ) {
    // creamos un Map privado que guarde las tarjetas
    const cards = new Map();

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

    // crear cada tarjeta con createImageCard
    images.forEach(image => {
        const cardComponent = createImageCard(image, onImageClick, onFavoriteToggle);

        grid.appendChild(cardComponent.element);
        cards.set(image.id, cardComponent);
        
    });

    return {
            element: grid,
            // funciones
        }
}

