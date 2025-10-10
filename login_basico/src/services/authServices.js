import { getUsers } from "../helpers/storage";
import  bcrypt  from "bcryptjs";



export default function validateCredentials(username, password) {

    
    // #password > a 8 caracteres
    if(!username.trim() || !password.trim() || !password.length < 6){
        return false;
    }

    const users = getUsers();

    // #username y password están en el localStorage

    const user = users.find((user) =>  user.username === username);


    const salt= bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const ok = bcrypt.compareSync(user.passwordHash, hash);

    return ok;

    // #Nota: siempre, siempre, siempre trimear la data de los formularios


    return // true o false
}
