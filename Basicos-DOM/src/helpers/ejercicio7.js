import fetching from "../utils/fetching";


const createEjercicio7 = () => {
  
  const renderBlog = (arrayPublicaciones) => {
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-container");

    arrayPublicaciones.forEach(post => {
      const postContainer = document.createElement("div");
      postContainer.classList.add("post");

      const title = document.createElement("p");
      title.classList.add("post-title");
      title.textContent=post.titulo;

      postContainer.appendChild(title);

      const metaDatos = document.createElement("p");
      metaDatos.classList.add("post-meta");
      metaDatos.textContent=`${post.autor} | ${post.fecha}`;

      postContainer.appendChild(metaDatos);

      const content = document.createElement("p");
      content.classList.add("post-content");
      content.textContent=post.contenido;

      postContainer.appendChild(content);

      const tagsContainer = document.createElement("div");
      tagsContainer.classList.add("tags-container");
      post.etiquetas.forEach(etiqueta => {
        const tag = document.createElement("p");
        tag.classList.add("tag");
        tag.textContent=etiqueta;

        tagsContainer.appendChild(tag);
      });

      postContainer.appendChild(tagsContainer);

      const likesCount = document.createElement("div");
      likesCount.classList.add("likes-count");
      likesCount.textContent=`❤️ ${post.likes} likes`;

      postContainer.appendChild(likesCount);

      blogContainer.appendChild(postContainer);
    });

    return blogContainer;
  }

  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML ="<h2>Ejercicio 7</h2>";

    fetching("publicaciones")
      .then(data => {
        mainContainer.appendChild(renderBlog(data));
      })
      .catch(err => console.error(err));

    return mainContainer;
  }

  return {
    render
  };
}

export default createEjercicio7;