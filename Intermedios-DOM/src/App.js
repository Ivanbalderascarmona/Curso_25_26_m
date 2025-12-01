import aplicacionClima from "./helpers/aplicacionClima";

export default function createApp () {
  const app = document.getElementById("app");
  app.appendChild(aplicacionClima().render());
}