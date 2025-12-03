/* 
1) crear una funcion llamada getWeatherByCity(cityName){
  que devuelva una data en json
}
2) crear una funcion llamada parseWeatherData(data){
  que devuelva:
    city, pais, temperatura, humedad, viento, description
}
*/

const getWeatherByCity = async (cityName) => {
  const API_KEY = import.meta.env.VITE_API_KEY || "359249287b6b6e96bbf06f5837af6e42";
  const URL_WEATHER = import.meta.env.VITE_URL_WEATHER || "https://api.openweathermap.org/data/2.5/weather?";

  if (typeof cityName !== "string") {
    throw new Error("La ciudad debe ser una cadena de caracteres");
  }
  try {
    // si añade metric en la url se devuelve en celsius sino en kelvins
    const response = await fetch(`${URL_WEATHER}q=${cityName}&units=metric&lang=es&appid=${API_KEY}`);
    if(!response.ok){
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Error al realizar la petición");
  }
}

const parseWeatherData = (data) => {
  return {
    city: data.name,
    pais: data.sys.country,
    temperatura: data.main.temp,
    humedad: data.main.humidity,
    viento: data.wind.speed,
    description: data.weather[0].description,
  }
}