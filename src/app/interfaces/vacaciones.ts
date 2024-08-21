export interface Vacaciones {
    id : number;
    cedula : string;
    nombre : string;
    fechaSolicitud : Date;
    fechaSalida : Date;
    fechaEntrada : Date;
    diasSolicitados: number;
    empleadoID : number;
}
