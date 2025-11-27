import fetching from "../utils/fetching";

const createEjercicio6 = () => {

  const renderCard = (usersArray) => {
    const usersContainer = document.createElement("div");
    usersContainer.classList.add("users-container");

    usersArray.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      const userName = document.createElement("p");
      userName.classList.add("user-name");
      userName.textContent = user.nombre;

      const userInfo = document.createElement("p");
      userInfo.classList.add("user-info");
      userInfo.textContent=`${user.edad} años | ${user.email}`;

      const userSkills = document.createElement("div");
      userSkills.classList.add("skills-container");
      user.habilidades.forEach(habilidad => {
        const p = document.createElement("p");
        p.classList.add("skill-tag");
        p.textContent=habilidad;
        userSkills.appendChild(p);
      });

      const userLevel = document.createElement("p");
      userLevel.classList.add("level-badge");
      if(user.nivel==="Junior"){
        userLevel.classList.remove("senior");
        userLevel.classList.add("junior");
      }else{
        userLevel.classList.remove("junior");
        userLevel.classList.add("senior");
      }
      userLevel.textContent=user.nivel;

      card.appendChild(userName);
      card.appendChild(userInfo);
      card.appendChild(userSkills);
      card.appendChild(userLevel);

      usersContainer.appendChild(card);
    });

    return usersContainer;
  }
  /**
   * 
   * @returns - Retorna un objeto html div que contiene las tarjetas creadas por la funcion renderCard
   */
  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML="<h2>Ejercicio 6</h2>"

    fetching("usuariosConHabilidades")
      .then(data => {
        mainContainer.appendChild(renderCard(data));
      })
      .catch(err => console.log(err));

    return mainContainer;
  }

  return {
    render
  }
}

export default createEjercicio6;