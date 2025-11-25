// importar variables de entorno
const PORT = import.meta.env.VITE_PORT;
const URL = import.meta.env.VITE_URL;

const URL_PORT = `${URL}:${PORT}`;


export default function createEjercicio1() {
  const notFetching = () => bienvenida.texto;
  

  const fetching = () => {
    return fetch(`${URL_PORT}/peliculas`)
        .then(res => res.json())
        .catch(err => console.error(err));
  };

  // aqui decido donde pintar el objeto en el DOM

  function render() {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = "Películas";

    // crear una card con cada pelicula
    fetching().then((data) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      const titleCard = document.createElement("h3");
      titleCard.textContent = data.titulo;
      card.appendChild(titleCard);
    })

    return container;
  }

  // retorno el objeto
  return {
    render,
  }
}