import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, map } from 'rxjs';  //Observable para operaciones async 
import { HttpClient, HttpParams } from '@angular/common/http'; //client para requests al api
import { Empleados } from '../interfaces/empleados';
import { Puestos } from '../interfaces/puestos';
import { EmpleadosDetalle } from '../interfaces/empleadosDetalle';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({ //decorator Injectable para hacerla injectable en otra clase o componente
  providedIn: 'root' //el provided indica de donde obtiene la dependencia, al indicar root crea una unica singleton y compartida instancia e inyecta donde sea
}) //al llamar servicio angular se encarga de resolver el servicio, el componente donde llama no carga constructor hasta estar resuelto
export class EmpleadosService {

  private apiUrl : string = '';
  constructor(private http : HttpClient,) { 
    this.apiUrl = environment.API_URL;
  }

  listarEmpleados() : Observable<Empleados[]>{ //de tipo empleados[], retorna lista de empleados
    return this.http.get<Empleados[]>(this.apiUrl + 'Empleados/ListarEmpleados').pipe( //el pipe es para encadenar operators de rxjs, aqui el map y catch
      map(response => response),
      catchError(error =>[])
    );
  }

  insertarEmpleados(Empleado : Empleados) : Observable<Respuesta> {
    return this.http.post<Respuesta>(this.apiUrl + 'Empleados/InsertarEmpleado', Empleado ).pipe(
      catchError(error =>[])
    );
  }

  editarEmpleados(Empleado : Empleados) : Observable<Respuesta> {
    return this.http.post<Respuesta>(this.apiUrl + 'Empleados/ModificarEmpleado', Empleado ).pipe(
      catchError(error =>[])
    );
  }

  inactivarEmpleados(Empleado : Empleados) : Observable<Empleados> {
    return this.http.post<Empleados>(this.apiUrl + 'Empleados/InactivarEmpleado', Empleado ).pipe(
      catchError(error =>[])
    );
  }

  listarPuestos() : Observable<Puestos[]>{ //de tipo empleados[], retorna lista de empleados
    return this.http.get<Puestos[]>(this.apiUrl + 'Puestos/ListarPuestos').pipe( //el pipe es para encadenar operators de rxjs, aqui el map y catch
      map(response => response),
      catchError(error =>[])
    );
  }

  buscarEmpleado(cedula : string) : Observable<EmpleadosDetalle> {
    const params = new HttpParams().set('cedula', cedula);
    return this.http.get<EmpleadosDetalle>( this.apiUrl + 'Empleados/BuscarEmpleado', {params}).pipe(
      catchError(error =>[])
    );
  }
}
