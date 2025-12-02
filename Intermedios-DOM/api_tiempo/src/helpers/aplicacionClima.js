import fetching from "../utils/fetching";
import guardarLocalStorage from "../utils/guardarLocalStorage";
import sacarLocalStorage from "../utils/sacarLocalStorage";

export default function () {

  const FAVORITES_KEY = 'weather-favorites';

  // Construyo el header de la página
  const buildHeader = () => {
    const headerContainer = document.createElement("header");
    headerContainer.innerHTML ="<h1>Tu app de confianza para consultar el tiempo</h1>"

    return headerContainer;
  }

  // Construyo el main de la página
  const buildMain = () => {
    const mainContainer = document.createElement("main");

    // Crear el formulario de busqueda
    const searchCard = document.createElement("div");
    searchCard.classList.add("searchCard");

    const formSerarch = document.createElement("form");
    formSerarch.id = "weather-form";
    formSerarch.classList.add("formSearch");

    const inputFormCiudad = document.createElement("input");
    inputFormCiudad.id="inputFormCiudad";
    inputFormCiudad.type="text";
    inputFormCiudad.placeholder="Escriba la ciudad...";


    const submitButton = document.createElement("button");
    submitButton.type="submit";
    submitButton.value="Buscar";
    submitButton.textContent = "Buscar";

    formSerarch.appendChild(inputFormCiudad);
    formSerarch.appendChild(submitButton);

    searchCard.appendChild(formSerarch);
    mainContainer.appendChild(searchCard);

    // Sección de Resultados
    const resultsSection = document.createElement("section");
    resultsSection.classList.add("results-section");
    resultsSection.innerHTML = "<h2>Resultado de Búsqueda</h2>";

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weatherCard");
    weatherCard.id = "weather-card-display"; 
    weatherCard.innerHTML = "<p>Introduce una ciudad para consultar el tiempo.</p>";
    
    resultsSection.appendChild(weatherCard);
    mainContainer.appendChild(resultsSection);

    // Sección de Favoritos
    const favoritesSection = document.createElement("section");
    favoritesSection.classList.add("favorites-section");
    favoritesSection.innerHTML = "<h2>Ciudades Favoritas</h2>";

    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favoriteCard");
    favoriteCard.id = "favorite-card-display"; 
    favoriteCard.innerHTML = "<p>Añade una tarjeta a favoritos.</p>";

    favoritesSection.appendChild(favoriteCard);
    mainContainer.appendChild(favoritesSection);

    return mainContainer;
  }

  const updateWeatherCard = (data) => {
    const tempCelsius = Math.round(data.temp - 273.15); 
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("weatherCard");
    
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    
    const titleCard = document.createElement("h3");
    titleCard.textContent = `${data.name}, ${data.pais}`;

    cardHeader.appendChild(titleCard);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const imgCard = document.createElement("img");
    imgCard.src = `../../public/img/${data.main.toLowerCase()}.jpg`;
    imgCard.alt = data.description;
    cardBody.appendChild(imgCard);

    const temperatureCard = document.createElement("p");
    temperatureCard.classList.add("temperature");
    temperatureCard.textContent = `${tempCelsius}°C`;
    cardBody.appendChild(temperatureCard);

    const descriptionCard = document.createElement("p");
    descriptionCard.classList.add("description");
    descriptionCard.textContent = data.description;
    cardBody.appendChild(descriptionCard);

    const timeCard = document.createElement("p");
    timeCard.classList.add("time");
    timeCard.textContent = data.main;
    cardBody.appendChild(timeCard);

    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardBody);
    
    return cardContainer;
  }

  const buildFooter = () => {
    const footerContainer = document.createElement("footer");

    const copyright = document.createElement("p");
    copyright.textContent ="Weather data provided by OpenWeather | © 2025 IvánBC."

    const enlaceWeb = document.createElement("a");
    enlaceWeb.href = "https://openweathermap.org/"
    enlaceWeb.textContent="OpenWeather";
    enlaceWeb.target="_blank";

    footerContainer.appendChild(copyright);
    footerContainer.appendChild(enlaceWeb);

    return footerContainer;
  }

  const render = () => {
    const mainContainer = document.createElement("div");

    mainContainer.appendChild(buildHeader());
    
    // Construir el main y capturar las referencias a los elementos
    const mainElement = buildMain();
    mainContainer.appendChild(mainElement);
    
    mainContainer.appendChild(buildFooter());

    // Obtener referencias a los elementos DENTRO de mainElement
    const form = mainElement.querySelector("#weather-form");
    const inputFormCiudad = mainElement.querySelector("#inputFormCiudad");
    const displayCard = mainElement.querySelector("#weather-card-display");
    const favoriteCardDisplay = mainElement.querySelector("#favorite-card-display");
    
    // Función local para renderizar favoritos
    const renderFavoritesLocal = () => {
        const favoritesMap = sacarLocalStorage(FAVORITES_KEY) || new Map();
        
        if (favoritesMap.size === 0) {
            favoriteCardDisplay.innerHTML = "<p>Añade una tarjeta a favoritos.</p>";
            return;
        }

        favoriteCardDisplay.innerHTML = ''; 
        
        favoritesMap.forEach((data, cityKey) => {
            const favCardElement = updateWeatherCard(data);
            favCardElement.id = `fav-${cityKey}`;
            favCardElement.setAttribute('data-city-key', cityKey);
            favCardElement.classList.add('favorite-item');
            
            // Evento de eliminación (Clic Derecho)
            favCardElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (confirm(`¿Estás seguro de que quieres eliminar "${cityKey}" de favoritos?`)) {
                    const currentMap = sacarLocalStorage(FAVORITES_KEY);
                    if (currentMap && currentMap.has(cityKey)) {
                        currentMap.delete(cityKey);
                        guardarLocalStorage(FAVORITES_KEY, currentMap);
                        renderFavoritesLocal(); // Recargar vista local
                    }
                }
            });
            
            favoriteCardDisplay.appendChild(favCardElement);
        });
    };

    // Renderizar favoritos iniciales
    renderFavoritesLocal();

    // Evento Submit
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ciudad = inputFormCiudad.value.trim();
      
      if (!ciudad) return;
      
      displayCard.textContent = "Cargando ... ⌛";
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
          const data = await fetching(ciudad);
          
          displayCard.innerHTML = ''; 
          const newCard = updateWeatherCard(data);
          displayCard.appendChild(newCard); 

          const cityKey = `${data.name}, ${data.pais}`.toLowerCase();
          
          // Adjuntar evento dblclick
          newCard.addEventListener('dblclick', () => {
              const favoritesMap = sacarLocalStorage(FAVORITES_KEY) || new Map();
              if (favoritesMap.has(cityKey)) {
                  alert(`"${cityKey}" ya está en favoritos.`);
                  return;
              }
              favoritesMap.set(cityKey, data);
              guardarLocalStorage(FAVORITES_KEY, favoritesMap);
              alert(`¡"${cityKey}" añadida a favoritos!`);
              renderFavoritesLocal();
          });

      } catch (err) {
          displayCard.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
          console.error('Error en la petición:', err);
      }
    });

    return mainContainer;
  }

  return {
    render
  }
}