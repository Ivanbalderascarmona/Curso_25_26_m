import fetching from "../utils/fetching";
import { peliculas } from "../db/data";
// importar variables de entorno
const PORT = import.meta.env.VITE_PORT;
const URL = import.meta.env.VITE_URL;

const URL_PORT = `${URL}:${PORT}`;


export default function createEjercicio3() {
  const notFetching = () => peliculas;
  

  const getStarts = (rating) => {
    const numStars = Math.floor(rating / 2);
    return "★".repeat(numStars);
  }

  const renderMoviesGrid = (moviesArray) => {
    const container = document.createElement("div");
    container.classList.add("movies-container");
    moviesArray.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");
      //imagen

      // titulo
      const title = document.createElement("h3");
      title.classList.add("movie-title");
      title.textContent = movie.titulo;
      card.appendChild(title);
      // año
      const year = document.createElement("p");
      year.classList.add("movie-year");
      year.textContent = movie.año;
      card.appendChild(year);
      // rating
      const rating = document.createElement("p");
      rating.classList.add("movie-rating");
      rating.textContent = `${getStarts(movie.rating)} ${movie.rating}/10`;
      card.appendChild(rating);

      container.appendChild(card);

    })


  // retorno el objeto
    return container;
  }

  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.style.marginTop="20px";
    mainContainer.innerHTML = "<h2>Ejercicio 3</h2>";
    // version sincrona
    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML="<h3>Versión síncrona</h3>";
    v1Wrapper.appendChild(renderMoviesGrid(notFetching()));
    mainContainer.appendChild(v1Wrapper);
    
    // version asincrona
    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML="<h3>Versión asíncrona</h3>";
    fetching("peliculas")
      .then(data => {
        v2Wrapper.appendChild(renderMoviesGrid(data));
      })
      .catch(err => {
        console.log("Error ",err);
        throw err;
      })
    mainContainer.appendChild(v2Wrapper);

    return mainContainer;
  }

  return {
      render
    }
}