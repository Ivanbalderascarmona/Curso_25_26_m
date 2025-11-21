import createEjercicio1 from "./helpers/ejercicio1";
import createEjercicio2 from "./helpers/ejercicio2";

export default function createApp() {
  const appDiv = document.getElementById("app");
  appDiv.appendChild(createEjercicio1().render());
  appDiv.appendChild(createEjercicio2().render());
}