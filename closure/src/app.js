


const app = () => {

    // primera función clousure

    // const crearClousure = () => {
    //     let mensajeSecreto = "Yo soy tu closure";

    //     return () => {
    //         console.log("Mensaje: ",mensajeSecreto);
    //     };
    // };

    // const miClosure = crearClousure();
    // miClosure();

    // --------- scope lexico ---------------

    // let nivelGlobal = "Soy Global 🌍"

    // const funcionExterna = () => {
    //     let nivelExterno = "Soy del scope externo";
    //     const funcionInterna = () => {
    //         let nivelInterno = "Soy del scope interno";

    //         demostración
    //         console.log("Accediendo a: ", nivelGlobal);
    //         console.log("Accediendo a: ", nivelExterno);
    //         console.log("Accediendo a: ", nivelInterno);
    //     };
    //     funcionInterna();
    // };
    // funcionExterna();


    // ------Ejercicios encapsulamiento----
    //  crear un objeto publico saldo, retirardinero(cantidad) <-- retirar dinero del saldo

    // const objetoPublico = {
    //     saldo: 1000,
    //     retirarDinero: function(cantidad) {
    //         this.saldo -= cantidad;
    //     },
    // };

    // objetoPublico.retirarDinero(100);
    // console.log("Saldo: ", objetoPublico.saldo);

    // const crearCuentaBancaria = (saldoInicial = 0) => {
    //      saldo ha de ser private
    //     let saldo = saldoInicial;
    //     return {
    //         obtenerSaldo: () => saldo,
    //         depositar: (cantidad = 0) => {
    //             if(cantidad > 0){
    //                 saldo += cantidad;
    //                 console.log(`✅ Cantidad ${cantidad} añadida. El nuevo saldo es ${saldo}`);
    //             }
    //              si es negativa no hago nada
    //             return true;
    //         },
    //         retirar: (cantidad = 0) => {
    //             if(cantidad > saldo){
    //                 console.log("La cantidad es mayor que el saldo.");
    //                 return false;
    //             }
    //             saldo -= cantidad;
    //             console.log(`✅ Cantidad ${cantidad} retirada. El nuevo saldo es ${saldo}`);
    //             return true;
    //         }
    //     };
    // };

    //  Primera cuenta
    // const miCuenta1 = crearCuentaBancaria(1000);

    // miCuenta1.depositar(100);
    // console.log("Saldo de la cuenta 1", miCuenta1.obtenerSaldo());

    // miCuenta1.retirar(50);
    
    // const miCuenta2 = crearCuentaBancaria(100);
    // console.log("Saldo de la cuenta 2: ",miCuenta2.obtenerSaldo());
    // miCuenta2.saldo=999999;
    // console.log("Saldo de la cuenta 2: ",miCuenta2.obtenerSaldo());


    // Crear un contador que pueda incrementar, decrementar, resetear y obtener el valor del contador
    //  Se pide:
    //  -Ej 1 
    // /-Crear dos contadores, uno que empiece en 10 y vaya hasta el 0 y otro que empiece en 0 y vaya hasta el 10
    //  - Ejemplificar utilizando un temporizador de un segundo utilizando los metodos del contador

    // setInterval(funcion, milisegundos a repetir esa funcion);
    // const crearContador = (valorInicial = 0) => {
    //     let valor = valorInicial;
    //     return {
    //         incrementar: (valorIncrementar = 1) => {
    //             if(valorIncrementar < 0) return false;
    //             if(typeof valorIncrementar !== "number") return false
    //             valor += valorIncrementar;
    //             return valor;
    //         },
    //         decrementar: (valorDecrementar = 1) => {
    //             if(valorDecrementar < 0) return false;
    //             if(typeof valorDecrementar !== "number") return false
    //             valor -= valorDecrementar;
    //             return valor;
    //         },
    //         reiniciar: () => {
    //             valor = valorInicial;
    //             return valor;
    //         },
    //         obtenerValor: () => valor
    //     }
    // };

    // const miContador1 = crearContador(10);
    // const miContador2 = crearContador(0);
    // console.log("Contador 1 valor: ", miContador1.obtenerValor());
    // const id = setInterval(() => {
    //     console.log("Contador 1 valor: ",miContador1.decrementar());
    // }, 1000);

    // setTimeout(() => {
    //     clearInterval(id);
    //     console.log("Contador 1 detenido...")
    // }, 10000);
    
    
    


    // ------------- prueba del carrito -------------


};

export default app