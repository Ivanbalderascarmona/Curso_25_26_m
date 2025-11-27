import { alojamientos } from "../db/data";
import fetching from "../utils/fetching";

export default function createEjercicio4() {
  // cloussure SCOPE

  //notfetching
  const notFetching = () => alojamientos

  //renderTable
  const renderTable = (alojamientosArray) => {
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");
    table.classList.add("table");

    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Nombre</th><th>Ubicación</th><th>Precio</th><th>Rating</th></tr>";

    const tbody = document.createElement("tbody");
    alojamientosArray.forEach(alojamiento => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.textContent = alojamiento.nombre;

      const td2 = document.createElement("td");
      td2.textContent = alojamiento.ubicacion;

      const td3 = document.createElement("td");
      td3.classList.add("price");
      td3.textContent = alojamiento.precio;

      const td4 = document.createElement("td");
      td4.classList.add("rating");
      td4.textContent = "⭐".repeat(Math.floor(alojamiento.rating));

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);

    tableContainer.appendChild(table);

    return tableContainer;
  }
  // render FUNCTION
  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML = "<h2>Ejercicio 4</h2>";

    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML = "<h3>Versión síncrona</h3>";
    v1Wrapper.appendChild(renderTable(notFetching()));
    mainContainer.appendChild(v1Wrapper);

    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = "<h3>Versión asíncrona</h3>";
    fetching("alojamientos")
      .then((data) => {
        v2Wrapper.appendChild(renderTable(data));
      })
      .catch(err => {
        throw err;
      });
    
    mainContainer.appendChild(v2Wrapper);

    return mainContainer;
  }
  return {
    render
  };
}