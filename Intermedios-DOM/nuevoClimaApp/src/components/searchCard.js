export default function createSearchCard(onSearch) {

  // variables privadas
  let isSearching = false;

  // DOM
  const container = document.createElement("div");
  // estilamos
  container.className = "bg-white rounded-lg shadow-lg p-6 mb-6";
  
  const title = document.createElement("h2");
  title.textContent = "🔍 Buscar Ciudad";
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Ingresa una ciudad";

  const searchButton = document.createElement("button");
  searchButton.textContent = "Buscar";

  const statusElement = document.createElement("p");
  statusElement.textContent = "";

  // crear un parrafo llamado statusElement que permita especificar los siguientes estados atraves de la 
  // funcion setStatus(message,type=info)
  // los estados son: 
  // -loading color blue-600
  // -error color red-600
  // -success color green-600
  // - info color gray-600
  // que permita modificar el valor del componente statusElement

  const setStatus = (message, type = "info") => {
    statusElement.textContent = message;
    if (type === "loading") {
      statusElement.className += "text-blue-600";
    }else if(type === "error") {
      statusElement.className += "text-red-600";
    }else if (type === "success") {
      statusElement.className += "text-green-600";
    }
    else {
      statusElement.className += "text-gray-600";
    }
  }

  async function performSearch() {
    const cityName = input.value.trim().toLowerCase();
    if (!cityName){
      setStatus("Ingresa una ciudad", "error");
      return;
    }
    if(typeof cityName !== "string"){
      setStatus("La ciudad debe ser una cadena de caracteres", "error");
      return;
    }
    // empezamos la busqueda
    isSearching = true;
    try {
      await onSearch(cityName);
      setStatus("Busqueda exitosa", "success");


    } catch (error) {
      setStatus("Error al buscar al buscar", "error");
      throw new Error("Error: ",error);
    }finally{
      isSearching = false;
    }

    //eventos 
    searchButton.addEventListener("click", performSearch);

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    })
  }

  container.appendChild(title);
  container.appendChild(input);
  container.appendChild(searchButton);
  container.appendChild(statusElement);


  
  return {
    element: container,
    focus: () => {
      input.focus();
    },
    clear: () => {
      input.value = "";
      setStatus("");
      isSearching = false;
    },
    performSearch,
    getInput: () => input.value.trim()
  }
}