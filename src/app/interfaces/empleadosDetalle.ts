import { Empleados } from "./empleados";

export interface EmpleadosDetalle extends Empleados {
    disponiblesID : number;
    diasDisponibles : number;
}
