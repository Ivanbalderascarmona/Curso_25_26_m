const moviesCache = [];
const URL="http://192.168.50.120:1492/api/movies";
const fetchMovies = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Error fetching");
    }
    const data = await response.json();
    moviesCache=data.results;
    return moviesCache;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMovies = () => {
  return [...moviesCache];
}

const getMovieById = (id)=> {
  return moviesCache.find(movie => movie.id === id);
}

export const movieService = {
  fetchMovies,
  getMovies,
  getMovieById
}