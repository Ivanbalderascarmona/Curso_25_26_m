import fetching from "../utils/fetching";

export default function createApiBooking() {

  const buildHeader = () => {
    const header = document.createElement("header");
    header.textContent = "Booking nevada";
    return header;
  }

  const buildMain = () => {
    const main = document.createElement("main");

    const form = document.createElement("form");
    form.id = "form";
    form.name = "form";

    const selectCity = document.createElement("select");
    selectCity.id = "selectCity";
    selectCity.name = "selectCity";
    selectCity.required = true;
    
    const option = document.createElement("option");
    option.value = "";
    option.disabled = true;
    option.selected = true;
    option.textContent = "Selecciona una ciudad";
    selectCity.appendChild(option);

    const inputCheckIn = document.createElement("input");
    inputCheckIn.id = "chekIn";
    inputCheckIn.type = "date";
    inputCheckIn.name = "checkIn";
    inputCheckIn.required = true;
    inputCheckIn.placeholder = "Selecciona una fecha de entrada";

    const inputCheckOut = document.createElement("input");
    inputCheckOut.id = "chekOut";
    inputCheckOut.type = "date";
    inputCheckOut.name = "checkOut";
    inputCheckOut.required = true;
    inputCheckOut.placeholder = "Selecciona una fecha de salida";

    const inputNumHuespedes = document.createElement("input");
    inputNumHuespedes.id = "numHuespedes";
    inputNumHuespedes.type = "number";
    inputNumHuespedes.name = "numHuespedes";
    inputNumHuespedes.required = true;
    inputNumHuespedes.placeholder = "Selecciona el numero de huespedes";
    inputNumHuespedes.min = "1";
    inputNumHuespedes.max = "10";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.id = "submitButton";
    submitButton.textContent = "Buscar";

    form.appendChild(selectCity);
    form.appendChild(inputCheckIn);
    form.appendChild(inputCheckOut);
    form.appendChild(inputNumHuespedes);
    form.appendChild(submitButton);


    const cardContainer = document.createElement("div");
    cardContainer.id = "cardContainer";
    cardContainer.classList.add("cardContainer");


    const carritoReserva = document.createElement("div");
    carritoReserva.id = "carritoReserva";
    carritoReserva.name = "carritoReserva";

    main.appendChild(form);
    main.appendChild(cardContainer);
    main.appendChild(carritoReserva);

    return main;
  }

  const createHotelCard = (hotel) => {
    const hotelCard = document.createElement("div");
    hotelCard.classList.add("hotelCard");

    const name = document.createElement("h3");
    name.textContent = hotel.name;

    const description = document.createElement("p");
    description.textContent = hotel.description;

    const stars = document.createElement("p");
    stars.textContent = "⭐".repeat(hotel.stars);

    const price = document.createElement("p");
    price.textContent = `Precio por noche: ${hotel.room_price_per_night}`;

    const maxGuests = document.createElement("p");
    maxGuests.textContent = `Maximo de huespedes: ${hotel.max_guests}`;

    hotelCard.appendChild(name);
    hotelCard.appendChild(description);
    hotelCard.appendChild(stars);
    hotelCard.appendChild(price);
    hotelCard.appendChild(maxGuests);
    
    return hotelCard;
  }

  const buildFooter = () => {
    const footerContainer = document.createElement("footer");

    const copyright = document.createElement("p");
    copyright.textContent = "Weather data provided by Booking Nevada | © 2025 IvánBC."

    footerContainer.appendChild(copyright);

    return footerContainer;
  }

  const render = () => {
    const appContainer = document.createElement("div");

    appContainer.appendChild(buildHeader());

    const mainContainer = buildMain();
    appContainer.appendChild(mainContainer);

    const footerContainer = buildFooter();
    appContainer.appendChild(footerContainer);

    const form = mainContainer.querySelector("#form");
    const selectCity = mainContainer.querySelector("#selectCity");
    const inputCheckIn = mainContainer.querySelector("#chekIn");
    const inputCheckOut = mainContainer.querySelector("#chekOut");
    const inputNumHuespedes = mainContainer.querySelector("#numHuespedes");
    const cardContainer = mainContainer.querySelector("#cardContainer");

    // Populate cities on load
    const loadCities = async () => {
      console.log("loadCities started");
      try {
        const cities = await fetching("cities");
        console.log("Cities fetched:", cities);
        cities.forEach(city => {
          const option = document.createElement("option");
          option.value = city.id;
          option.textContent = city.name;
          selectCity.appendChild(option);
        });
      } catch (error) {
        console.error("Error loading cities:", error);
        alert("Error al cargar las ciudades");
      }
    };
    loadCities();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const cityId = parseInt(selectCity.value);
      const checkIn = inputCheckIn.value;
      const checkOut = inputCheckOut.value;
      const numHuespedes = parseInt(inputNumHuespedes.value);

      if (!cityId || !checkIn || !checkOut || !numHuespedes) {
        alert("Por favor, completa todos los campos");
        return;
      }
      if (new Date(checkIn) >= new Date(checkOut)) {
        alert("La fecha de salida debe ser mayor que la fecha de entrada");
        return;
      }

      try {
        // 1. Fetch Hotels in the city
        const allHotels = await fetching("hotels");
        const cityHotels = allHotels.filter(hotel => hotel.city_id === cityId);

        if (cityHotels.length === 0) {
            cardContainer.innerHTML = "";
            const noHotelsMsg = document.createElement("p");
            noHotelsMsg.textContent = "No hay hoteles disponibles en esta ciudad.";
            cardContainer.appendChild(noHotelsMsg);
            return;
        }

        // 2. Fetch Availability
        const availabilityData = await fetching("availability");
        
        // Filter availability for the relevant hotels
        const relevantAvailability = availabilityData.filter(avail => 
            cityHotels.some(hotel => hotel.id === avail.hotel_id)
        );

        // Group availability by hotel
        const availabilityByHotel = new Map();
        relevantAvailability.forEach(avail => {
            if (!availabilityByHotel.has(avail.hotel_id)) {
                availabilityByHotel.set(avail.hotel_id, []);
            }
            availabilityByHotel.get(avail.hotel_id).push(avail);
        });

        const availableHotelIds = [];

        // Check availability for each hotel
        cityHotels.forEach(hotel => {
            const hotelAvailability = availabilityByHotel.get(hotel.id) || [];
            
            // Calculate total days requested
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            let availableDaysCount = 0;

            // Check each day in the range
            for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
                const dateString = d.toISOString().split('T')[0];
                
                const dayRecord = hotelAvailability.find(a => {
                    // Handle both string date and timestamp if necessary, but assuming ISO string based on usage
                    const recordDate = new Date(a.date).toISOString().split('T')[0];
                    return recordDate === dateString;
                });

                if (dayRecord && dayRecord.is_available) {
                    availableDaysCount++;
                }
            }

            // If the hotel is available for ALL requested days
            // AND the hotel can accommodate the number of guests
            if (availableDaysCount === diffDays && hotel.max_guests >= numHuespedes) {
                availableHotelIds.push(hotel.id);
            }
        });

        const availableHotels = cityHotels.filter(hotel => availableHotelIds.includes(hotel.id));

        // Update DOM
        cardContainer.innerHTML = ""; // Clear previous results
        if (availableHotels.length === 0) {
            const p = document.createElement("p");
            p.textContent = "No se encontraron hoteles disponibles para las fechas y huéspedes seleccionados.";
            cardContainer.appendChild(p);
        } else {
            availableHotels.forEach(hotel => {
                cardContainer.appendChild(createHotelCard(hotel));
            });
        }

      } catch (err) {
        console.error("Error en la búsqueda:", err);
        alert("Ocurrió un error al buscar hoteles.");
      }
    });

    return appContainer;
  }

  return {
    render
  }
}