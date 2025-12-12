import createMovieCard from "./MovieCard"
export const MovieList = () => {
  const container = document.getElementById("movies-container");

  const clear = () => {
    if(container) container.innerHTML="";
  }

  const render = (movies) => {
    clear();

    if(movies.length === 0){
      const noResults = document.createElement("div");
      noResults.className="no-results";
      noResults.textContent="No hay peliculas";
      container.appendChild(noResults);
    }
    return ;
  }
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  })

  return {
    render,
    clear
  }
}