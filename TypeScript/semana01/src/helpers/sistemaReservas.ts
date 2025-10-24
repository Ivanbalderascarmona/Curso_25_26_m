// ej Crear un sistema de reservas de un restaurante que tenga un map con la clave de hora de la reserva en 
// ej formato YYYY-MM-DD
// ej el valor es un set con los nombres(DNI) de los clientes que han reservado ese dia
// ej agregarReservas
// ej cancelarReserva
// ej mostrarReservas
// ej estadisticas Reservas por día, reservas totales, media de reservas


const sistemaReservas = () => {
    //const fecha = Date.parse("YYYY-MM-DD");

    const reservasRestaurante = new Map<string, Set<string> >();


    const agregarReserva = (fecha:string, nombre:string):void => {

        if(!reservasRestaurante.has(fecha)){
            reservasRestaurante.set(fecha, new Set<string>());
        }
        reservasRestaurante.get(fecha)?.add(nombre);

    }

    const eliminarReserva = (nombre:string, fecha:string):void => {
        if(!reservasRestaurante.has(fecha)){
            throw new Error("No existen reservas en esa fecha.");
        }
        
        reservasRestaurante.get(fecha)?.delete(nombre);

    }

    const mostrarReservas = (nombre:string):string[] => {

        const reservas:string[] = [];
        for( const [ fecha, nombres ] of reservasRestaurante){
            if(nombres.has(nombre)){
                reservas.push(fecha);
            }
        }
        return reservas;
    }

    const estadisticas = ():void => {

        let reservasDia= 0;
        for(const [ fecha, nombres ] of reservasRestaurante){
            console.log(`Las reservas en la fecha: ${fecha} son: ${nombres.size}`)
            reservasDia+=nombres.size;
        }
        const mediaReservasDia:number = reservasDia/reservasRestaurante.size;
        console.log(`La media de reservas por dia es: ${mediaReservasDia}`)
    }

    function test():void {
        agregarReserva("2025-04-01", "Iván");
        agregarReserva("2025-04-01", "María");
        agregarReserva("2025-04-01", "Carlos");
        agregarReserva("2025-04-02", "Lucía");
        agregarReserva("2025-04-02", "Andrés");
        agregarReserva("2025-04-02", "Sofía");
        agregarReserva("2025-04-03", "Miguel");
        agregarReserva("2025-04-03", "Laura");
        agregarReserva("2025-04-03", "Pedro");
        agregarReserva("2025-04-04", "Elena");
        agregarReserva("2025-04-04", "Javier");
        agregarReserva("2025-04-05", "Valeria");
        agregarReserva("2025-04-05", "Diego");
        agregarReserva("2025-04-05", "Camila");
        agregarReserva("2025-04-06", "Ricardo");
        agregarReserva("2025-04-06", "Ana");
        agregarReserva("2025-04-06", "Mateo");
        agregarReserva("2025-04-07", "Paula");
        agregarReserva("2025-04-07", "Héctor");
        agregarReserva("2025-04-07", "Natalia");
        agregarReserva("2025-04-08", "Iván");
        agregarReserva("2025-04-08", "Sofía");
        agregarReserva("2025-04-09", "Carlos");
        agregarReserva("2025-04-09", "Laura");
        agregarReserva("2025-04-09", "Pedro");
        agregarReserva("2025-04-10", "Lucía");
        agregarReserva("2025-04-10", "Andrés");
        agregarReserva("2025-04-10", "Valeria");
        agregarReserva("2025-04-11", "Diego");
        agregarReserva("2025-04-11", "Miguel");
        agregarReserva("2025-04-12", "Paula");
        agregarReserva("2025-04-12", "Camila");
        agregarReserva("2025-04-13", "Ricardo");
        agregarReserva("2025-04-13", "Ana");
        agregarReserva("2025-04-13", "Mateo");
        agregarReserva("2025-04-14", "Elena");
        agregarReserva("2025-04-14", "Javier");



        eliminarReserva("Iván", "2025-04-08");

        console.log(`La reservas de Iván son en la/s fecha/s: ${mostrarReservas("Iván")}`);
        console.log(`La reservas de Elena son en la/s fecha/s: ${mostrarReservas("Elena")}`);
        console.log(`La reservas de Héctor son en la/s fecha/s: ${mostrarReservas("Héctor")}`);
        console.log(`La reservas de Laura son en la/s fecha/s: ${mostrarReservas("Laura")}`);
        console.log(`La reservas de Ana son en la/s fecha/s: ${mostrarReservas("Ana")}`);

        estadisticas();


    }
    return {
        agregarReserva, eliminarReserva, estadisticas, mostrarReservas, test
    };
} 
export default sistemaReservas;


