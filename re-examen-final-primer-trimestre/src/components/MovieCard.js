import { Storage } from "../utils/storage";
export default createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.className="movie-card";
  // identifac cada card con un nombre único
  card.dataset.movieId = movie.id;

  // está la tarjeta en el localstorage??
  if(Storage.isWatched(movie.id)){
    card.classList.add("movie-watched");
  }

  const poster = document.createElement("img");
  poster.className="movie-poster";
  poster.src=`http://192.168.50.120${movie.poster_path}`;

  // info de la pelicula
  const info = document.createElement("div");
  info.className="movie-info";

  //titulo
  const title = document.createElement("h3");
  title.className="movie-title";
  title.textContent = movie.title;

  // rating
  const rating = document.createElement("h3");
  rating.className="movie-rating";
  rating.textContent = `⭐ ${movie.vote_average}`;

  info.appendChild(title);
  info.appendChild(rating);
  card.appendChild(poster);
  card.appendChild(info);

  card.addEventListener("click",()=>{
    if (card.classList.contains("movie-watched")) {
      card.classList.remove("movie-watched");
      Storage.removeWatchedMovie(movie.id);
    } else {
      card.classList.add("movie-watched");
      Storage.addWatchedMovie(movie.id);
    }
  })

  card.addEventListener("dblclick",()=>{
    card.remove();
  })

  card.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    if (card.classList.contains("movie-watched")) {
      card.classList.remove("movie-watched");
      Storage.removeWatchedMovie(movie.id);
    }
  })

  return card;
}