// crear una funcion que se le pase como parametro una ciudad y devuelva temperatura y humedad actual usando la api de openweathermap
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_OPENWEATHER = import.meta.env.VITE_API_OPENWEATHER;

export function getWeatherPromise(city="Granada") {
    const URL = `${VITE_API_OPENWEATHER}?q=${city}&unit=metric&lang=es&appid=${VITE_API_KEY}`;

    //peticion a una api de openweather

    return fetch(URL)
        .then(response => {
            if(!response.ok){
                throw new Error("Error al obtener los datos de la API.")
            }
            return response.json()
        })
        .then(data => {
            console.log(`------clima de la ciudad ${city} -----------`)
            console.log(`------Temperatura: ${data.main.temp} ºC `)
            const arrayImg= ['☁️','☀️','🌧️','⛅'];
            const weather = data.weather[0].main;
            switch(weather){
                case "Mist" : console.log(`El clima es ${arrayImg[0]} ${weather} `); break;
                case "Sunny" : console.log(`El clima es ${arrayImg[1]} ${weather} `); break;
                case "Rain" : console.log(`El clima es ${arrayImg[2]} ${weather} `); break;
                case "Clouds" : console.log(`El clima es ${arrayImg[3]} ${weather} `); break;
            }
            console.log(`------Humedad: ${data.main.humidity} % `)
            return data;
        })
        .catch(error => console.log("Error ...", error))
        .finally(() => console.log("Cerrando getWeatherPromise"));
        ;
}