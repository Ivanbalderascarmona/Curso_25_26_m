import fetching from "../utils/fetching";


const createEjercicio8 = () => {
  
  const renderMenu = (menuRestaurante) => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const title = document.createElement("div");
    title.classList.add("restaurant-title");
    title.textContent =menuRestaurante.nombre;

    menuContainer.appendChild(title);


    menuRestaurante.categorias.forEach(categoria => {
      const categoriaContainer = document.createElement("div");
      categoriaContainer.classList.add("menu-category");

      const categoryTitle = document.createElement("p");
      categoryTitle.classList.add("category-title");
      categoryTitle.textContent = categoria.nombre;

      const categoryDivider = document.createElement("div");
      categoryDivider.classList.add("category-divider");

      const dishesContainer = document.createElement("div");
      dishesContainer.classList.add("dishes-container");

      categoria.platos.forEach(dish => {
        const dishContainer = document.createElement("div");
        dishContainer.classList.add("dish-item");

        const headerDish = document.createElement("div");
        headerDish.classList.add("dish-header");

        const nameDish = document.createElement("p");
        nameDish.classList.add("dish-name");
        nameDish.textContent = dish.nombre;

        const priceDish = document.createElement("p");
        priceDish.classList.add("dish-price");
        priceDish.textContent = dish.precio;

        const descriptionDish = document.createElement("p");
        descriptionDish.classList.add("dish-description");
        descriptionDish.textContent = dish.descripcion;

        headerDish.appendChild(nameDish);
        headerDish.appendChild(priceDish);

        dishContainer.appendChild(headerDish);
        dishContainer.appendChild(descriptionDish);


        dishesContainer.appendChild(dishContainer)

      });

      categoriaContainer.appendChild(categoryTitle);
      categoriaContainer.appendChild(categoryDivider);
      categoriaContainer.appendChild(dishesContainer);

      menuContainer.appendChild(categoriaContainer);
    });

    return menuContainer;
  }

  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML = "<h2>Ejercicio 8</h2>"

    fetching("menuRestaurante")
      .then(data => {
        mainContainer.appendChild(renderMenu(data));
      })
      .catch(err => {
        console.log(err);
      })

    return mainContainer;
  }
  
  return {
    render
  }
}
export default createEjercicio8;