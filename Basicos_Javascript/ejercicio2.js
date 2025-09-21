//Crear un juego de un dado que utilizando una funcion llamada tirar dado, 
// permita tirar un dado de seis caras con valores 1-6.
//Además crear una función llamada simular que le pase como parámetro el número de tiradas que quiero 
// simular y devuelva que número se ha repetido mas veces.

//Variables
let numTiradas=0;
let resultado=[];
let numRepeticiones=[];
let posicionNumRep=0;
let numMasRepetido=0;
//Funciones

/**
 * Esta función simula la tirada de un dado de seis caras devolviendo un resaltado aleatorio entre 1 y 6.
 * @returns {number} - número aleatorio entre 1 y 6
 */
function tirarDado(){
    return Math.floor(Math.random() *6) + 1;
}
/**
 * Esta función simula un número determinado de tiradas de un dado del 1 al 6 dado por el usuario.
 * @param {number} [numTiradas=1] - número de tiradas que quiero simular
 */
function simular(numTiradas = 1){
    for(let i=0; i<numTiradas; i++){
        resultado[i] = tirarDado();
    }
    for(let i=0; resultado.length; i++){
        switch(resultado[i]){
            case 1: numRepeticiones[0]++;
            case 2: numRepeticiones[1]++;
            case 3: numRepeticiones[2]++;
            case 4: numRepeticiones[3]++;
            case 5: numRepeticiones[4]++;
            case 6: numRepeticiones[5]++;
        }
    }
    for(let i=0; i<resultado.length; i++){
        posicionNumRep = Math.max(numRepeticiones[i]);
        let numMasRepetido=numRepeticiones.indexOf(posicionNumRep);
        switch(numMasRepetido){
            case 0: console.log("El numero mas repetido es el 1 con "+posicionNumRep+" repeticiones");
            case 1: console.log("El numero mas repetido es el 2 con "+posicionNumRep+" repeticiones");
            case 2: console.log("El numero mas repetido es el 3 con "+posicionNumRep+" repeticiones");
            case 3: console.log("El numero mas repetido es el 4 con "+posicionNumRep+" repeticiones");
            case 4: console.log("El numero mas repetido es el 5 con "+posicionNumRep+" repeticiones");
            case 5: console.log("El numero mas repetido es el 6 con "+posicionNumRep+" repeticiones");
        }
        
    }

}

console.log(simular(2));