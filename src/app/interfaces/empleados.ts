export interface Empleados {
    id : number;
    cedula : string;
    primerNombre : string;
    segundoNombre : string;
    primerApellido : string;
    segundoApellido : string;
    direccion : string;
    telefono : string;
    fechaNacimiento : Date;
    correoElectronico : string;
    fechaIngreso : Date;
    puesto : string;
    salario : number;
    estado? : string;
    diasDisponibles? : number;




}
