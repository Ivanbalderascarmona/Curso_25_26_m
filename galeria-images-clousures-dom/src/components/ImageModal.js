export default function createImageModal(){
    // cerrar la imagen modal
    // que sea click o ESC
    const modalContainer = document.createElement("div");
    modalContainer.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center opacity-0 pointer-events-none transition-opacity";

    // contenido del modal
    const content = document.createElement("div");
    content.className = "relative bg-white rounded-lg overflow-hidden max-w-3xl w-full p-4";

    const img = document.createElement("img");
    img.className = "w-full h-auto rounded";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "❌";
    closeBtn.className = "absolute top-2 right-2 text-2xl font-bold cursor-pointer";

    content.appendChild(img);
    content.appendChild(closeBtn);

    modalContainer.appendChild(content);

    function openModal(image) {
        img.src = image.url;
        img.alt = image.title;
        modalContainer.classList.remove("opacity-0", "pointer-events-none");
        modalContainer.classList.add("opacity-100", "pointer-events-auto");
        document.addEventListener("keydown", handleEsc);
    }
    function closeModal(image) {
        modalContainer.classList.remove("opacity-100", "pointer-events-auto");
        modalContainer.classList.add("opacity-0", "pointer-events-none");
        document.removeEventListener("keydown", handleEsc);
    }

    closeBtn.onclick = closeModal;
    modalContainer.onclick = (e) => {if (e.target === modalContainer) closeModal();};

    function handleEsc(e) {if (e.key === "Escape") closeModal();};


    return {
        element:modalContainer,
        openModal,
        closeModal
    }
}