// importar variables de entorno

import fetching from "../utils/fetching";

export default function createEjercicio2() {


  const renderList = (tareasList) => {
    const ul = document.createElement("ul");
    tareasList.forEach(tarea => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      if(tarea.completada){
        li.classList.add("completed");
      }
      li.textContent = tarea.texto;
      ul.appendChild(li);
    });
    return ul;
  }

  const render =  () => {
    const mainContainer = document.createElement("div");
    mainContainer.style.marginTop="20px";
    mainContainer.innerHTML = "<h2>Ejercicio 2</h2>";

    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML="<h3>Versión asíncrona</h3>";
    fetching("tareas")
      .then(data => {
        v2Wrapper.appendChild(renderList(data));
      })
      .catch(err => {
        console.log("Error ",err);
        throw err;
      })
    mainContainer.appendChild(v2Wrapper);

    return mainContainer;
  }

  return {
    render
  }
}