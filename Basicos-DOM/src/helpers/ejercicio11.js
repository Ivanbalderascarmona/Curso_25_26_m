// Desarrollar un sistema de reseñas que permita a lo usuarios:
// 1. esquribir reseñas de los restaurantes
// 2. calificar con un sitema de estrellas los rentaurantes 1-5
// validar los datos del formulario
// 4. guardar las reseñas en el localStorage5. ver y eliminar reseñas guardadas

export default function createEjercicio11() {
  const buildForm = ( ) => {
    const form = document.createElement("form");
    form.classList.add("review-form");

    const p = document.createElement("p");
    p.id="comentarioValidacion";
    p.textContent="";
    
    const inputRestaurante = document.createElement("input");
    inputRestaurante.type="text";
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
      const arrayReseñas = reseñas ? JSON.parse(reseñas) : [];
      arrayReseñas.push(data);
      
      try{
        localStorage.setItem("reseñas", JSON.stringify(arrayReseñas));
      }catch(e){
        console.error("Error al guardar reseñas en localStorage", e);
      }
      p.classList.remove("error");
      p.classList.add("success");
      p.textContent="Reseña guardada exitosamente";

      inputRestaurante.value="";
      inputComentario.value="";
      inputEstranger.value="";
      
    });

    return {
      element: form
    };
  };

  const buildReseñas = () => {
    const container = document.createElement("div");
    container.classList.add("reviews-container");
    const p = document.createElement("p");
    p.classList.add("no-reviews-message");


    const reseñas = localStorage.getItem("reseñas"); 
    const arrayReseñas = reseñas ? JSON.parse(reseñas) : [];
    if (arrayReseñas.length !== 0) {
      p.textContent="";
      
      p.classList.remove("no-reviews-message");
      
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
      p.textContent="No hay reseñas guardadas";
    }
    container.appendChild(p);
    return {
      element: container
    };
  }

  const render = () => {
    const container = document.createElement("div");
    container.classList.add("exercise-11-container");
    const title = document.createElement("h2");
    title.textContent= "Reseñas Restaurantes";
    container.appendChild(title);
    const form = buildForm().element
    let reseñas = buildReseñas().element;
    container.appendChild(form);
    container.appendChild(reseñas);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      container.removeChild(reseñas);
      reseñas = buildReseñas().element;
      container.appendChild(reseñas);
      
    })
    return {
      element: container
    };
  }

  return {
    render
  }

}