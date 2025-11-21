// importar variables de entorno

const PORT = import.meta.env.VITE_PORT;
const URL = import.meta.env.VITE_URL;

const URL_PORT = `${URL}:${PORT}`;

export default function createEjercicio2() {
  const fetching = async () => {
    try {
      const response = await fetch(`${URL_PORT}/tareas`);
      
      if (!response.ok) {
        throw new Error("Data no obtenida correctamente");
      }

      const data = await response.json();

      

      return Array.from(data);

    } catch (error) {
      throw new Error(error);
    }
  }
  const render = () =>{
    const tareasDiv = document.createElement("div");
    tareasDiv.style.marginTop = "30px";
    const title = document.createElement("h2");
    title.textContent = "Lista de tareas";

    const list = document.createElement("ul");

    fetching().then((data) => data.forEach(tarea => {
      const li = document.createElement("li");
      li.classList.add("task-item");
      if (tarea.completada) li.classList.add("completed");
      li.textContent = tarea.texto;
      list.appendChild(li);
    }));
    tareasDiv.appendChild(title)
    tareasDiv.appendChild(list);

    return tareasDiv;
  }

  return {
    render,
  }

}