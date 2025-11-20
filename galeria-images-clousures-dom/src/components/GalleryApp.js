import { imagesData } from "../data/images";
import { createImageGrid } from "./ImageCard";
import createImageModal from "./ImageModal";

export default function createGalleryApp() {
    // # contenedor principal

    const container = document.createElement("div");
    container.className = "min-h-screen bg-linear-to-br from-purple-900 via-white to-pink-900";


    // !        --------Header--------

    const header = document.createElement("header");
    header.className = "bg-white shadow-lg sticky top-0 z-40";

    const headerContentDiv = document.createElement("div");
    headerContentDiv.className = "max-w-7xl mx-auto px-6 py-6";

    const headerTitle = document.createElement("h1");
    headerTitle.className = "text-3xl font-bold text-purple-600 mb-2";
    headerTitle.textContent = "🎨 Galería de imágenes";

    const headerSubtitle = document.createElement("p");
    headerSubtitle.className = "text-gray-600";
    headerSubtitle.textContent = "Aprende Clousures, funciones Fábrica y manipulación del DOM"

    headerContentDiv.appendChild(headerTitle);
    headerContentDiv.appendChild(headerSubtitle);
    header.appendChild(headerContentDiv);
    

    // !        --------main--------
    const main = document.createElement("main");
    main.className = "max-w-7xl mx-auto px-6 py-8 ";

    // contador de favoritos

    const counterComponent = document.createElement("h2");
    counterComponent.textContent = "Tienes 0 favoritos.";
    counterComponent.className = "text-center text-xl font-semibold mb-4 text-orange-600";


    function updateFavoritosCounter() {
        const favoritos = imagesData.filter(image => image.isFavorite).length;
        counterComponent.textContent = `Tienes ${favoritos} favoritos.`;
    };

    // modal de imagen

    const imageModal = createImageModal();

    // grid de imágenes
    
    const gridComponent = document.createElement("h2");
    const imageComponent = createImageGrid(imagesData, 
        (image) => imageModal.openModal(image),
        (image) => updateFavoritosCounter()
    );

    main.appendChild(counterComponent);
    main.appendChild(imageComponent.element);
    main.appendChild(imageModal.element);
    main.appendChild(gridComponent);



    // !        --------footer--------

    const footer = document.createElement("footer");
    footer.className = "bg-white shadow-lg text-center"

    const footerContentDiv = document.createElement("div");
    footerContentDiv.className = "max-w-7xl mx-auto px-6 py-6";

    const footerText = document.createElement("p");
    footerText.className = "text-gray-600";
    footerText.innerHTML = `
    Ejercicio DOM by Iván Balderas Carmona <br>
    <a href= "https://github.com/Ivanbalderascarmona/Curso_25_26_m" target="_blank">Mi GitHub</a>`

    footerContentDiv.appendChild(footerText);
    footer.appendChild(footerContentDiv);

    // ? añadir todo al container
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);
    return {
        element: container,
    }
}
