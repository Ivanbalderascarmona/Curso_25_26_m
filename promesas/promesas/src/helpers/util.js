
const VITE_API_URL = import.meta.env.VITE_API_URL;

export function dataJSONPromise() {
    //Hacer una funcion que se traiga la data usando promise
    fetch(VITE_API_URL)
        .then(response => {
                if(!response.ok){
                    throw new Error("Error en la petición");
                }
                return response.json();
            })
            .then(data => {
                console.log(`Data obtenida de ${VITE_API_URL}: `);
                console.log(data);
                resolve(data);
            })
            .catch(error => console.log("Error ...", error))
            .finally(message => console.log("Cerrando JSONPromise"))
}
export function createJSONPromise() {
    //Hacer una funcion que se traiga la data usando promise
    const promesa = new Promise((resolve, reject) => {
        fetch(VITE_API_URL)
            .then(response => {
                if(!response.ok !== "ok"){
                    throw new Error("Error en la petición");
                }
                return response.json();
            })
            .then(data => {
                console.log(`Data obtenida de ${VITE_API_URL}: `);
                console.log(data);
                resolve(data);
            })
            .catch(error = console.log("Error ...", error))
            .finally(message = console.log("Cerrndo JSONPromise"));
    })
    return promesa;
}

export const dataJSONAsync = async () => {
    console.log("------------dataJSONAsync-----------")
    try {
        const response = await fetch(VITE_API_URL);
        if(!response.ok){
            throw new Error("Error en la petición");
        }

        const data = await response.json();
        const dataParseada = data.map((infoFoto)=>{
            return {
                title: infoFoto.title,
                thumbnailUrl: infoFoto.thumbnailUrl
            };
        });
        console.log("-----------Data Parseada-----------");
        console.table(dataParseada);
        return dataParseada;

    }catch(error){
        console.log("Error ...", error);
    }
}



