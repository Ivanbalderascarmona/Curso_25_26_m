import fetching from "../utils/fetching";

const createEjercicio5 = () => {

  const createMessageParagraph = () => {
    const p = document.createElement("p");
    p.id = "message-status"; // Asignar un ID para actualizarlo después
    return p;
  };

  const renderForm = (ubicacionesArray, createMessageParagraph) => {
    const form = document.createElement("form");
    form.classList.add("form-group");

    const select = document.createElement("select");
    select.id="select";
    // <form action="">
    //   <select name="opcion" id="opcion">
    //     <option value="1"></option>
    //     <option value="2"></option>
    //     <option value="3"></option>
    //   </select>
    // </form>
    const defaultOption = document.createElement("option");
    defaultOption.value="";
    defaultOption.textContent="Elige una ubicación";
    defaultOption.disabled="true";
    defaultOption.selected="true";

    select.appendChild(defaultOption);

    ubicacionesArray.forEach(ubicacion => {
      const option = document.createElement("option");
      option.classList.add("form-row");
      option.value=ubicacion.id;
      option.textContent=ubicacion.nombre;
      select.appendChild(option);
    });

    const check_in = document.createElement("input");
    check_in.type="date";
    check_in.name="check_in";
    check_in.id="check_in";
    check_in.classList.add("form-row");
    
    const check_out = document.createElement("input");
    check_out.type="date";
    check_out.name="check_out";
    check_out.id="check_out";
    check_out.classList.add("form-row");
    
    const submitButton = document.createElement("button");
    submitButton.type="submit";
    submitButton.textContent="Reservar";
    submitButton.classList.add("form-row");

    form.appendChild(select);
    form.appendChild(check_in);
    form.appendChild(check_out);
    form.appendChild(submitButton);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const ubicacionSeleccionada = select.value;
      const checkInDate = check_in.value;
      const checkOutDate = check_out.value;
      let mensaje = "";

      const messageP = document.getElementById("message-status") || createMessageParagraph();

      if (!ubicacionSeleccionada || !checkInDate || !checkOutDate) {
        mensaje = "❌ Debes seleccionar todos los campos.";
        messageP.classList.remove("success");
        messageP.classList.add("error");
      }else if (new Date(checkInDate) >= new Date(checkOutDate)) {
        mensaje = "❌ La fecha de check-in debe ser anterior a la fecha de check-out.";
        messageP.classList.remove("success");
        messageP.classList.add("error");
      }else{
        mensaje = "✅ ¡Reserva realizada con éxito!";
        messageP.classList.remove("error");
        messageP.classList.add("success");
      }
      messageP.textContent = mensaje;
    });

    return form;
  }

  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML="<h2>Ejercicio 5</h2>";
    const messageParagraph = createMessageParagraph(); // Creamos el párrafo de mensajes
    mainContainer.appendChild(messageParagraph); // Lo añadimos al contenedor principal

    fetching("ubicaciones")
      .then(data => {
        mainContainer.appendChild(renderForm(data, messageParagraph));
      })
      .catch(err => {
        console.log("Error ",err);
        messageParagraph.textContent = "❌ Error al cargar las ubicaciones. Por favor, inténtelo de nuevo.";
        messageParagraph.classList.add("error");
      })
    
    return mainContainer;
  }

  return {
    render
  }

}

export default createEjercicio5;