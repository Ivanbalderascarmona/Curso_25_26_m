// url a https://rickandmortyapi.com/api/character/?name=nombre
// crear un buscador dinámico (con cada pulsacion del teclado realizo la búsqueda) para que atraves de un formulario 
// utilizando el boton de buscar o un enter realizara una búsqueda por el nombre todas las posibles coincidencias. 
// Mostrando en un grid todos los resultados.
// -Utilizar fetch para traer los datos.
// - implementar una caché para que através de un map guarde las búsquedas anteriores.
// - Si busco dos veces la misma palabra, no lo buscara en la api sino que lo buscara en el map

const URL_RICK=import.meta.env.VITE_URL_Rick;
const cache = new Map();

const buscadorDinamico = () => {
  const buscadorContainer = document.createElement("div");
  buscadorContainer.style.marginTop="20px";

  const h2 = document.createElement("h2");
  h2.textContent = "Buscador de personajes";

  const form = document.createElement("form");
  form.id = "buscadorForm";

  const inputForm = document.createElement("input");
  inputForm.id = "inputForm";
  inputForm.type="text";
  inputForm.placeholder="Buscar personaje...";
  inputForm.autocomplete="off";

  form.appendChild(inputForm);

  const button = document.createElement("button");
  button.type="submit";
  button.textContent = "Buscar";

  form.appendChild(button);

  const gridResultDiv = document.createElement("div");
  gridResultDiv.id="resultGridDiv";

  buscadorContainer.appendChild(h2);
  buscadorContainer.appendChild(form);
  buscadorContainer.appendChild(gridResultDiv);



  const renderResults = (personajes) => {
    gridResultDiv.innerHTML = "";
    if (typeof personajes === "string") {
      gridResultDiv.style.color="#e61919ff"
      gridResultDiv.textContent = `No se ha encontrado el personaje ${personajes}`;
      return;
    }
    gridResultDiv.style.color="#000000ff"
    personajes.forEach(personaje => {
      const card = document.createElement("div");
      card.style.border="1px solid #ccc";
      card.style.padding="10px";
      card.style.textAlign="center";

      const img = document.createElement("img");
      img.src=personaje.image;
      img.alt=`Foto de ${personaje.name}`;
      img.style.width="100px";
      img.style.borderRadius="8px";

      const p = document.createElement("p");
      p.textContent=`Nombre del personaje: ${personaje.name}`;

      card.appendChild(img);
      card.appendChild(p);

      gridResultDiv.appendChild(card);
    });
  }

  const fetchData = async (name) => {
    if(cache.has(name)){
      return cache.get(name);
    }

    try {
      const response = await fetch(`${URL_RICK}/?name=${name}`);
      if (!response.ok) {
        return name;
      }
      const data = await response.json();
      return data.results;
    } catch (err) {
      console.log("Error: ",err);
      throw err;
    }
  }

  const busqueda = async () => {
    const valor = inputForm.value.trim().toLowerCase();
    if (!valor){
      gridResultDiv.innerHTML="";
      return;
    }

    const personajes = await fetchData(valor);
    renderResults(personajes);
  };

  let timeoutId;
  inputForm.addEventListener("input", (e) => {
    const texto = e.target.value;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      busqueda(texto);
    }, 500);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    busqueda();
  });

  return {
    render: () => buscadorContainer
  }
};

export default buscadorDinamico;