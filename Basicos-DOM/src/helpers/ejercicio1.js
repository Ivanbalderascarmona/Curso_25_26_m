import { bienvenida } from "../db/data";

// importar variables de entorno
const PORT = import.meta.env.VITE_PORT;
const URL = import.meta.env.VITE_URL;

const URL_PORT = `${URL}:${PORT}`;


export default function createEjercicio1() {
  const notFetching = () => bienvenida.texto;
  

  const fetching = () => {
    return fetch(`${URL_PORT}/bienvenida`)
        .then(res => res.json())
        .then(data => data.texto)
        .catch(err => console.error(err));
  };

  // aqui decido donde pintar el objeto en el DOM

  function render() {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = "Ejercicio 1";

    const parrafo = document.createElement("p");
    parrafo.classList.add("welcome-message");
    // parrafo.textContent = notFetching();
    fetching().then((data) => parrafo.textContent = data);

    container.appendChild(title);
    container.appendChild(parrafo);

    return container;
  }

  // retorno el objeto
  return {
    render,
  }
}


