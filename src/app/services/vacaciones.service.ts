import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, map } from 'rxjs';  //Observable para operaciones async 
import { HttpClient } from '@angular/common/http'; //client para requests al api
import { Empleados } from '../interfaces/empleados';
import { Puestos } from '../interfaces/puestos';
import { SolicitudVacaciones } from '../interfaces/solicitudVacaciones';
import { Respuesta } from '../interfaces/respuesta';
import { Vacaciones } from '../interfaces/vacaciones';

@Injectable({ //decorator Injectable para hacerla injectable en otra clase o componente
  providedIn: 'root' //el provided indica de donde obtiene la dependencia, al indicar root crea una unica singleton y compartida instancia e inyecta donde sea
}) //al llamar servicio angular se encarga de resolver el servicio, el componente donde llama no carga constructor hasta estar resuelto
export class VacacionesService {

  private apiUrl : string = '';
  constructor(private http : HttpClient,) { 
    this.apiUrl = environment.API_URL;
  }

  solicitarDias(Vacaciones : SolicitudVacaciones) : Observable<Respuesta> {
    return this.http.post<Respuesta>(this.apiUrl + 'Vacaciones/SolicitarVacaciones', Vacaciones ).pipe(
      catchError(error =>[])
    );
  }

  listarVacaciones() : Observable<Vacaciones[]> {
    return this.http.get<Vacaciones[]>(this.apiUrl + 'Vacaciones/ListarVacaciones' ).pipe(
      catchError(error =>[])
    );
  }
}
