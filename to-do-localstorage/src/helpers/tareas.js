// aqui van las funciones helper para las tareas


import { uid } from "uid";

const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;
//funcion mostrarTareas devuelve el array de todas las tareas y si no hay solo devuelve un array vacio

const getTareas = (clave=TEXT_KEY) => {


    if(localStorage.hasOwnProperty(clave)){
        const arrayTareas = saveJSONParse(localStorage.getItem(clave));
        if(!Array.isArray(arrayTareas)){
            console.Error("💥 Error: la data ${arrayTareas} no es un array");
            return [];
        }
    }
    return arrayTareas;
};

export const saveTareas=(arrayTareas=[], clave=TEXT_KEY) => {
    try{
        if(!Array.isArray(arrayTareas)){
            throw new Error("💥 Error: la data ${arrayTareas} no es un array");
        }
        localStorage.setItem(clave, JSON.stringify(arrayTareas));
        console.info("💾 Tareas guardadas");
    }catch(error){
        throw new Error(" 💥 Error al guardar las tareas");
    }
};

export const addTarea=(nombreTarea)=>{
    const nombre = String(nombreTarea ?? "").trim();
    try {
        const nuevaTarea= {
            id: uid(),
            nombre,
            fechaCreacion: new Date().toISOString(),
            completada: false
        }
        if(hasOwnProperty(nombre)){

        }
        saveTareas(getTareas().push(nuevaTarea));
        
    } catch (error) {
        
    }
    const fecha = new Date().toISOString();
    let tareas= getTareas();
    tareas.push({id: uid(), nombre, fecha, completada: false});
    saveTareas(tareas);
};

export const removeTarea=(id)=>{
    let tareas= getTareas();
    tareas =tareas.filter(tarea => tarea.id!==id);
    saveTareas(tareas);
};

export const completarTarea=(id)=>{
    let tareas= getTareas();
    tareas = tareas.map(tarea => tarea.id === id ? {...tarea, completada:true}  :  tarea);
    saveTareas(tareas);
};

export const desCompletarTarea=(id)=>{
    let tareas= getTareas();
    tareas = tareas.map(tarea => tarea.id === id ? {...tarea, completada:false}  :  tarea);
    saveTareas(tareas);
};

export const buscarCompletadas=(tareas)=>{
    return tareas.filter(tarea => tarea.estado===true);
};


function saveJSONParse(text) {
    try {
        if(typeof text !== "string"){
            throw new Error ('Error: la data ${text} no es un string');
        }
        return JSON.parse(text);
    } catch (error) {
        throw new Error("Error al parsear la data");
    }
};






export default getTareas;