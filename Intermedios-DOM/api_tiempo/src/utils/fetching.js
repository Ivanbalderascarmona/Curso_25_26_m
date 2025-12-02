import guardarLocalStorage from "./guardarLocalStorage";
import sacarLocalStorage from "./sacarLocalStorage";


async function fetching(ciudad) {
  const API_KEY = import.meta.env.API_KEY || "359249287b6b6e96bbf06f5837af6e42";
  const URL_GEO = import.meta.env.VITE_URL_GEO || "http://api.openweathermap.org/geo/1.0/direct?";
  const URL_WEATHER = import.meta.env.URL_WEATHER || "https://api.openweathermap.org/data/2.5/weather?";

  if (typeof ciudad !== "string") {
    throw new Error("La ciudad debe ser una cadena de caracteres");
  }
  const cleanCiudad = ciudad.trim().toLowerCase();

  try {
    // Si ya esta en el localStorage saco la informacion dee ahi, sino hago una petición
    const cachedData = sacarLocalStorage(`${cleanCiudad}`);
    if (cachedData && cachedData.has('data')) {
      return cachedData.get('data');
    }
    
    const response = await fetch(`${URL_GEO}q=${cleanCiudad}&limit=1&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const dataCiudades = await response.json();
    if (!dataCiudades || dataCiudades.length === 0) {
        throw new Error("Ciudad no encontrada");
    }
    const lat = dataCiudades[0].lat;
    const lon = dataCiudades[0].lon;

    const responseWeather = await fetch(`${URL_WEATHER}lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!responseWeather.ok) {
      throw new Error("Error al obtener los datos");
    }
    const dataWeather = await responseWeather.json();
    const data = {
      name: dataCiudades[0].name,
      pais: dataCiudades[0].country,
      main: dataWeather.weather[0].main,
      description: dataWeather.weather[0].description,
      temp: dataWeather.main.temp,
    }
    const mapData = new Map();
    mapData.set('data', data);
    guardarLocalStorage(`${cleanCiudad}`, mapData);
    return data;
  } catch (error) {
    throw new Error(error.message || "Error al realizar la petición");
  }
}

export default fetching