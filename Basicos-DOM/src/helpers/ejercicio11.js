// Desarrollar un sistema de reseñas que permita a lo usuarios:
// 1. esquribir reseñas de los restaurantes
// 2. calificar con un sitema de estrellas los rentaurantes 1-5
// validar los datos del formulario
// 4. guardar las reseñas en el localStorage5. ver y eliminar reseñas guardadas

export default function createEjercicio11() {
  const buildForm = ( ) => {
    const form = document.createElement("form");

    const p = document.createElement("p");
    p.id="comentarioValidacion";
    p.textContent="";
    
    const inputRestaurante = document.createElement("input");
    inputRestaurante.type="test";
    inputRestaurante.id="nombreRestaurante";
    inputRestaurante.placeholder="Ingrese el nombre del restaurante";

    const inputComentario = document.createElement("textarea");
    inputComentario.placeholder="Ingrese su reseña";

    const inputEstranger = document.createElement("input");
    inputEstranger.type="number";
    inputEstranger.id="estrellas";
    inputEstranger.placeholder="Ingrese la calificación del restaurante";
    inputEstranger.min="1";
    inputEstranger.max="5";

    const submitBtn = document.createElement("button");
    submitBtn.type="submit";
    submitBtn.textContent="Enviar";

    form.appendChild(p);
    form.appendChild(inputRestaurante);
    form.appendChild(inputComentario);
    form.appendChild(inputEstranger);
    form.appendChild(submitBtn);
    
    form.addEventListener("submit", (e) =>{
      e.preventDefault();

      const restaurante = inputRestaurante.value.trim();  
      const comentario = inputComentario.value.trim();
      const estrellas = inputEstranger.value;

      if(!restaurante || !comentario || !estrellas){
        p.classList.remove("success");
        p.classList.add("error");
        p.textContent="Por favor, rellene todos los campos";
        return;
      }
      if(estrellas < 1 || estrellas > 5){
        p.classList.remove("success");
        p.classList.add("error");
        p.textContent="Por favor, seleccione una calificación entre 1 y 5";
        return;
      }
      
      const data = {
        restaurante,
        comentario,
        estrellas
      };
      const reseñas = localStorage.getItem("reseñas");
      const arrayReseñas = [];
      if (reseñas) {
        arrayReseñas = JSON.parse(reseñas);
      }
      arrayReseñas.push(data);
      
      try{
        localStorage.setItem("reseñas", JSON.stringify(arrayReseñas));
      }catch(e){
        console.error("Error al guardar reseñas en localStorage", e);
      }
      p.classList.remove("error");
      p.classList.add("success");
      p.textContent="Reseña guardada exitosamente";
      
    });
    return {
      element: form,
    };
  };

  const buildReseñas = () => {
    const container = document.createElement("div");

    const reseñas = localStorage.getItem("reseñas");
    if (reseñas) {
      const arrayReseñas = JSON.parse(reseñas);
      arrayReseñas.forEach(reseña => {
        const reseñaCard = document.createElement("div");
        reseñaCard.classList.add("reseñaCard");
        const nombre  = document.createElement("h3");
        nombre.textContent = reseña.restaurante;
        const comentario = document.createElement("p");
        comentario.textContent = reseña.comentario;
        const estrellas = document.createElement("p");

        estrellas.textContent = reseña.estrellas;
        reseñaCard.appendChild(nombre);
        reseñaCard.appendChild(comentario);
        reseñaCard.appendChild(estrellas);

        reseñaCard.addEventListener("dblclick", () => {
          const index = arrayReseñas.indexOf(reseña);
          if (index > -1) {
            arrayReseñas.splice(index, 1);
            localStorage.setItem("reseñas", JSON.stringify(arrayReseñas));
            container.removeChild(reseñaCard);
          }
        })

        container.appendChild(reseñaCard);
      });
      return {
        element: container
      };
    }else{
      container.innerHTML="<p>No hay reseñas guardadas</p>";
    }
    return {
      element: container
    };
  }

  const render = () => {
    const container = document.createElement("div");
    container.appendChild(buildForm().element);
    container.appendChild(buildReseñas().element);
    return {
    container
    };
  }

  return {
    render
  }

}