export const createApp = () => {
  const app = document.getElementById("app");
  const header = document.createElement("header");
  header.className="header";

  const title = document.createElement("h1");
  title.textContent="MovieFlix IvanBC";

  header.appendChild(title);

  const main = document.createElement("main");
  main.className="main-container";

  const filtersContainer = document.createElement("div");
  filtersContainer.className="filters-container";

  const searchContainer = document.createElement("div");
  searchContainer.className="search-container";

  const searchInput = document.createElement("input");
  searchInput.type="text";
  searchInput.className="search-input";
  searchInput.placeholder="Buscar películas...";


}