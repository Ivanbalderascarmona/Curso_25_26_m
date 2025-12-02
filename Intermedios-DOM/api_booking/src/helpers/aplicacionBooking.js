import fetching from "../utils/fetching";

export default function () {

  const buildHeader = () => {
    const header = document.createElement("header");
    header.textContent="Booking nevada";
    return header;
  }

  const buildMain = () => {
    const main = document.createElement("main");


    const form = document.createElement("form");
    form.id="form";
    form.name="form";

    const selectCity = document.createElement("select");
    selectCity.id="selectCity";
    selectCity.name="selectCity";
    selectCity.required=true;
    selectCity.placeholder="Selecciona una ciudad";

    const option = document.createElement("option");
    option.value="";
    option.disabled=true;
    option.selected=true;
    option.textContent="Selecciona una ciudad";
    selectCity.appendChild(option);

    const inputCheckIn = document.createElement("input");
    inputCheckIn.id="chekIn";
    inputCheckIn.type="date";
    inputCheckIn.name="checkIn";
    inputCheckIn.required=true;
    inputCheckIn.placeholder="Selecciona una fecha de entrada";

    const inputCheckOut = document.createElement("input");
    inputCheckOut.id="chekOut";
    inputCheckOut.type="date";
    inputCheckOut.name="checkOut";
    inputCheckOut.required=true;
    inputCheckOut.placeholder="Selecciona una fecha de salida";

    const inputNumHuespedes = document.createElement("input");
    inputNumHuespedes.id="numHuespedes";
    inputNumHuespedes.type="number";
    inputNumHuespedes.name="numHuespedes";
    inputNumHuespedes.required=true;
    inputNumHuespedes.placeholder="Selecciona el numero de huespedes";
    inputNumHuespedes.min="1";
    inputNumHuespedes.max="10";

    const submitButton = document.createElement("button");
    submitButton.type="submit";
    submitButton.textContent="Buscar";

    form.appendChild(selectCity);
    form.appendChild(inputCheckIn);
    form.appendChild(inputCheckOut);
    form.appendChild(inputNumHuespedes);
    form.appendChild(submitButton);


    const cardContainer = document.createElement("div");
    cardContainer.id="cardContainer";
    cardContainer.name="cardContainer";


    const carritoReserva = document.createElement("div");
    carritoReserva.id="carritoReserva";
    carritoReserva.name="carritoReserva";

    main.appendChild(form);
    main.appendChild(cardContainer);
    main.appendChild(carritoReserva);

    return main;
  }

  const updateCardContainer = (arrayHoteles) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer");

    arrayHoteles.forEach((hotel) => {
      const hotelCard = document.createElement("div");
      hotelCard.classList.add("hotelCard");

      const name = document.createElement("h3");
      name.textContent = hotel.name;

      const description = document.createElement("p");
      description.textContent = hotel.description;

      const stars = document.createElement("p");
      stars.textContent="⭐".repeat(hotel.stars);

      const price = document.createElement("p");
      price.textContent = `Precio por noche: ${hotel.room_price_per_night}`;

      const maxGuests = document.createElement("p");
      maxGuests.textContent = `Maximo de huespedes: ${hotel.max_guests}`;

      hotelCard.appendChild(name);
      hotelCard.appendChild(description);
      hotelCard.appendChild(stars);
      hotelCard.appendChild(price);
      hotelCard.appendChild(maxGuests);

      cardContainer.appendChild(hotelCard);
    });

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
    const appContainer = document.createElement("div");

    appContainer.appendChild(buildHeader());

    const mainContainer = buildMain();
    appContainer.appendChild(mainContainer);

    const footerContainer = buildFooter();
    appContainer.appendChild(footerContainer);

    const form = mainContainer.getElementById("form");
    const selectCity = mainContainer.getElementById("selectCity");
    const inputCheckIn = mainContainer.getElementById("chekIn");
    const inputCheckOut = mainContainer.getElementById("chekOut");
    const inputNumHuespedes = mainContainer.getElementById("numHuespedes");
    const submitButton = mainContainer.getElementById("submitButton");
    const cardContainer = mainContainer.getElementById("cardContainer");
    const carritoReserva = mainContainer.getElementById("carritoReserva");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = selectCity.value;
      const checkIn = inputCheckIn.value;
      const checkOut = inputCheckOut.value;
      const numHuespedes = inputNumHuespedes.value;
      
      if(!city || !checkIn || !checkOut || !numHuespedes){
        alert("Por favor, completa todos los campos");
        return;
      }
      if(new Date(checkIn) >= new Date(checkOut)){
        alert("La fecha de salida debe ser mayor que la fecha de entrada");
        return;
      }
      const dataHotels = fetching("hotels")
        .then(data => {
          const arrayHoteles = data.filter((hotel) => {
            return hotel.city_id === city;
          })
          return arrayHoteles;
        })
        .catch(err => {
          throw new Error("Error al cargar la informacion de los hoteles. Error:", err)
        })

      const dataAvailability = fetching("availability")
        .then(data => {
          const arrayAvailability = data.filter((hotel) => {
            return dataHotels.map(hotelArray => hotelArray.id).includes(hotel.hotel_id);
          })
          const mapHoteles = new Map();
          arrayAvailability.forEach(hotel => {
            if (!mapHoteles.has(hotel.hotel_id)) {
              mapHoteles.set(hotel.hotel_id, []);
            }
            const hotelMap = mapHoteles.get(hotel.hotel_id);
            hotelMap.push(hotel);
            mapHoteles.set(hotel.hotel_id, hotelMap);
          })
          const arrayHotelesDisponibles = [];
          mapHoteles.forEach((hotelMap, hotelId) => {
            let fechasTotales = 0;
            let fechasNoDisponibles=0;
            hotelMap.forEach(hotel => {
              if (new Date(hotel.date) >= new Date(checkIn) && new Date(hotel.date) <= new Date(checkOut)) {
                if (!(hotel.is_available)) {
                  fechasNoDisponibles++;
                }
                fechasTotales++;
              }
            })
            if( fechasTotales >0 && fechasTotales-fechasNoDisponibles === fechasTotales){
              arrayHotelesDisponibles.push(hotelId);
            }
          })
          return arrayHotelesDisponibles;
        })
        .catch(err => {
          throw new Error("Error al cargar la informacion de la disponibilidad. Error:", err);
        })

      
      
      
    })

    return appContainer;

  }
}