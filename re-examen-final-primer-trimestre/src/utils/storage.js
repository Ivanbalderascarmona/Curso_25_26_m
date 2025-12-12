const KEY = "watches_movies";

const save = (movies) => {
  localStorage.setItem(KEY,JSON.stringify(movies));
}
const getWatchedMovies = () => {
  
  const stored =  localStorage.getItem(KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  }catch (err) {
    return [];
  }

}

const addWatchedMovie = (movieId) => {
  const movies = getWatchedMovies();
  if (!movies.includes(movieId)) {
    movies.push(movieId);
    save(movies);
  }
} 

const removeWatchedMovie = (idMovie) => {
  const movies = getWatchedMovies();
  const index = movies.indexOf(idMovie);
  if(index !== -1){
    movies.splice(index,1);
    save(movies);
  }
}

const isWatched = (movieId) => {
  const movies = getWatchedMovies();
  return movies.includes(movieId);
}

export const Storage = {
  getWatchedMovies,
  addWatchedMovie,
  removeWatchedMovie,
  isWatched
}