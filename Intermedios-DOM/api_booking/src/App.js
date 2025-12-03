import createApiBooking from "./helpers/aplicacionBooking";

function createApp() {
  const app = document.getElementById("app");
  app.appendChild(createApiBooking().render());
}

export default createApp