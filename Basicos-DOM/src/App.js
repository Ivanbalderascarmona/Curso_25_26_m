import createEjercicio1 from "./helpers/ejercicio1";
import createEjercicio2 from "./helpers/ejercicio2";
import createEjercicio3 from "./helpers/ejercicio3";
import createEjercicio4 from "./helpers/ejercicio4";
import createEjercicio5 from "./helpers/ejercicio5";
import createEjercicio6 from "./helpers/ejercicio6";
import createEjercicio7 from "./helpers/ejercicio7";
import createEjercicio8 from "./helpers/ejercicio8";
import createEjercicio11 from "./helpers/ejercicio11";
import createBuscadorDinamico from "./helpers/buscadorDinamico";

export default function createApp() {
  const appDiv = document.getElementById("app");
  appDiv.appendChild(createEjercicio1().render());
  appDiv.appendChild(createEjercicio2().render());
  appDiv.appendChild(createEjercicio3().render());
  appDiv.appendChild(createEjercicio4().render());
  appDiv.appendChild(createEjercicio5().render());
  appDiv.appendChild(createEjercicio6().render());
  appDiv.appendChild(createEjercicio7().render());
  appDiv.appendChild(createEjercicio8().render());
  appDiv.appendChild(createEjercicio11().render());
  appDiv.appendChild(createBuscadorDinamico().render());
}