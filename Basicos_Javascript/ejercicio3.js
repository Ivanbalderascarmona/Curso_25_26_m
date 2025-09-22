/*
                                    GESTION BANCARIA REVOLUT

    Se pretende llevar la gestion de un sistema bancario con JavaScript que permita;
    -crear cuentas con titular y saldo.
    -Depositar dinero en una cuenta.
    -Retirar dinero de una cuenta.(siempre que no tenga saldo negativo)
    -Mostrar el saldo de una cuenta.
    -Transeferir dinero entre dos cuentas validando que tengan saldo para transferir.
    -Mantener un listado de cuentas y buscar cuentas por titular.
    -Cuando creemos una cuenta se debe generar un numero de cuenta como un numero de cuenta real(24 digitos) generado aleatoriamente.
    -Test con consol.log con todos los posibles casos llamar a la funcion test() y 
    que solo haya que llamar a esa funcion test en el inicio de aplicacion
*/

let cuentas =[];
let numero=0;

/**
 * Esta función genera un número de cuenta aleatorio de 24 dígitos.
 * @returns {number} - número de cuenta de 24 dígitos
 */
function generarNumeroCuenta(){
    numero = '';
    for(let i=0; i<24; i++){
        numero += Math.floor(Math.random() * 10);
    }
    return numero;
}

/**
 * Esta función crea una cuenta bancaria con un titular, saldo y número de cuenta.
 * @param {string} titular - nombre del titular de la cuenta
 * @param {number} saldo - saldo inicial de la cuenta
 */
function Cuenta(titular,saldo){
    this.titular=titular;
    this.saldo=saldo;
    this.numeroCuenta=generarNumeroCuenta();
}
/**
 * Esta función crea una nueva cuenta bancaria y la añade al listado de cuentas.
 * @param {string} titular titular de la cuenta
 * @param {number} saldo saldo inicial de la cuenta
 * @returns la cuenta creada
 */
function crearCuenta(titular, saldo) {
    const cuenta = new Cuenta(titular, saldo);
    cuentas.push(cuenta);
    return cuenta;
}

/**
 * Esta función permite depositar dinero en una cuenta bancaria.
 * @param {object} cuenta -cuenta en la que se va a depositar el dinero
 * @param {number} dineroDepositado dinero a depositar
 */
function depositarDinero(cuenta,dineroDepositado){
    if(dineroDepositado>0){
        cuenta.saldo+=dineroDepositado;
    }
}
/**
 * Esta función permite retirar dinero de una cuenta bancaria siempre que tenga saldo suficiente.
 * @param {object} cuenta -cuenta de la que se va a retirar el dinero
 * @param {number} dineroRetirado - dinero a retirar
 */
function retirarDinero(cuenta, dineroRetirado){
    if(dineroRetirado>0 && cuenta.saldo>=dineroRetirado){
        cuenta.saldo-=dineroRetirado;
    }
}
/**
 * esta función muestra el saldo de una cuenta bancaria.
 * @param {object} cuenta -cuenta de la que se va a mostrar el saldo
 * @returns {number} - saldo de la cuenta
 */
function mostrarSaldo(cuenta){
    return cuenta.saldo;
}

/**
 * Esta función permite transferir dinero entre dos cuentas bancarias siempre que la cuenta de origen tenga saldo suficiente.
 * @param {object} cuentaOrigen -cuenta de origen
 * @param {object} cuentaDestino -cuenta de destino
 * @param {number} dineroTransferido - dinero a transferir
 */
function transferirDinero(cuentaOrigen,cuentaDestino,dineroTransferido){
    if(cuentaOrigen.saldo>=dineroTransferido && dineroTransferido>0){
        cuentaOrigen.saldo-=dineroTransferido;
        cuentaDestino.saldo+=dineroTransferido;
    }
}

/**
 * esta función busca y devuelve un array con las cuentas que coinciden con el titular dado.
 * @param {string} titular 
 * @returns {Array} - array con las cuentas que coinciden con el titular
 */
function buscarCuentaPorTitular(titular){
    return cuentas.filter(cuenta => cuenta.titular === titular);
}

function test(){
    let miCuenta = crearCuenta("Iván", 1000);
    console.log(miCuenta.numeroCuenta); // Puedes ver el número de cuenta generado

    depositarDinero(miCuenta, 500);
    console.log("Saldo después de depositar 500:", mostrarSaldo(miCuenta)); // Debería ser 1500

    retirarDinero(miCuenta, 200);
    console.log("Saldo después de retirar 200:", mostrarSaldo(miCuenta)); // Debería ser 1300

    let otraCuenta = crearCuenta("María", 2000);
    console.log(otraCuenta.numeroCuenta); // Puedes ver el número de cuenta generado

    transferirDinero(miCuenta, otraCuenta, 300);
    console.log("Saldo de miCuenta después de transferir 300 a otraCuenta:", mostrarSaldo(miCuenta)); // Debería ser 1000
    console.log("Saldo de otraCuenta después de recibir 300 de miCuentaa:", mostrarSaldo(otraCuenta)); // Debería ser 2300

    let cuentasDeIvan = buscarCuentaPorTitular("Iván");
    console.log("Cuentas de Iván:", cuentasDeIvan); // Debería mostrar las cuentas de Iván
}

test();