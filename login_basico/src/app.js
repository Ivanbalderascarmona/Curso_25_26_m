import { DB } from "./db/db.js";
import { initialStorage } from "./helpers/storage.js";
import validateCredentials from "./services/authServices.js";
import { renderLoginForm } from "./views/loginView.js";

export function initialApp(){
    // # iniciamos guardando los usuarios en el localStorage
    initialStorage(DB);

    // Pintamos/renderizamos mi formulario
    const app = document.getElementById("app");
    app.innerHTML = renderLoginForm();

    const form = document.querySelector("#loginForm");
    const message = document.querySelector("#message");

    // # Poner un escuchador de eventos al formulario
    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        // # Comprobar si username y password son correctos
        const { username, password } = Object.entries(new FormData(form));
        

        const ok = validateCredentials(username, password);
        message.innerHTML = ok 
            ? `<span style="green">Login Correcto</span>`  
            : `<span style="red">Usuario o contraseña incorrectos</span>`;
        form.reset();
    });

}