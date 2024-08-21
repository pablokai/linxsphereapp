import { Component, EventEmitter, Output } from '@angular/core';
import { EmpleadosService } from '../../../services/empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleados } from '../../../interfaces/empleados';
import { EmpleadosDetalle } from '../../../interfaces/empleadosDetalle';
import { VacacionesService } from '../../../services/vacaciones.service';
import { SolicitudVacaciones } from '../../../interfaces/solicitudVacaciones';
import { Respuesta } from '../../../interfaces/respuesta';

@Component({
  selector: 'app-solicitud-vacaciones',
  templateUrl: './solicitud-vacaciones.component.html',
  styleUrl: './solicitud-vacaciones.component.css'
})
export class SolicitudVacacionesComponent {

  public modalSwitch : boolean = false;
  public estado : boolean = false;
  public mensaje :string = '';

  public mostrarDetalle : boolean = false;
  public formGroupBusqueda : FormGroup = this.formBuilder.group({});
  public formGroupSolicitarDias : FormGroup = this.formBuilder.group({});
  public empleado : EmpleadosDetalle = {
    id : 0,
    cedula : '',
    primerNombre : '',
    segundoNombre : '',
    primerApellido : '',
    segundoApellido : '',
    direccion : '',
    telefono : '',
    fechaNacimiento : new Date,
    correoElectronico : '',
    fechaIngreso : new Date,
    puesto : '',
    salario : 0,
    estado : '',
    disponiblesID : 0,
    diasDisponibles: 0
  };
  public respuesta : Respuesta = {
    resultado :'',
    estado: 0
  };

  constructor(
    private empleadosService :  EmpleadosService,
    private vacacionesService : VacacionesService, 
    private formBuilder :  FormBuilder
  ){}

  ngOnInit(): void {
    this.formGroupBusqueda = this.formBuilder.group({
      cedula: ['', Validators.required],
    });

    this.formGroupSolicitarDias = this.formBuilder.group({
      fechaSalida: [new Date, Validators.required],
      fechaEntrada: [new Date, Validators.required],
    });
    
  }

  onSearch(dataForm : any){

    let empleadoBuscar : string =  dataForm.cedula;

    this.empleadosService.buscarEmpleado(empleadoBuscar).subscribe( (response) => {
      this.empleado = response;
      if( this.empleado != null){       
        
        if(this.empleado.diasDisponibles > 0 ){
          this.mostrarDetalle =  true;
        }else{
          this.modalSwitch = true;
          this.estado = false;
          this.mensaje = 'No cuenta con días disponibles'
          this.mostrarDetalle = false;
        }
      }else{
        this.modalSwitch = true;
        this.estado = false;
        this.mensaje = 'No se encontraron datos de ese empleado'
        this.mostrarDetalle = false;
      }
     
      this.formGroupBusqueda.reset();
    });

   

  }

  handleModalSwitch(childData : boolean)  {
    this.modalSwitch = childData;
  }

  onRequestDays(dataForm : any) {

    var diasSolicitados : number = ( Date.parse(dataForm.fechaEntrada) - Date.parse(dataForm.fechaSalida) ) / (1000 * 60 * 60 * 24);

    if(diasSolicitados <= 0){
      this.modalSwitch = true;
      this.estado = false;
      this.mensaje = 'Los rangos de fechas ingresados no son permitidos'
    }
    else
    {
      var vacaciones : SolicitudVacaciones = {
        empleadoId : this.empleado.id,
        fechaSolicitud : new Date,
        diasSolicitados : diasSolicitados,
        fechaEntrada : dataForm.fechaEntrada,
        fechaSalida : dataForm.fechaSalida
      }

      this.vacacionesService.solicitarDias(vacaciones).subscribe( (response)=> {
        this.respuesta = response;
        
        if(this.respuesta.estado == 0){
          this.modalSwitch = true;
          this.estado = false;
          this.mensaje = this.respuesta.resultado;
        }else{
          this.modalSwitch = true;
          this.estado = true;
          this.mensaje = this.respuesta.resultado;
        }
        
        this.mostrarDetalle = false;
        this.formGroupSolicitarDias.reset();

      });   
}
  
  }

  onSubmitBuscarEmpleado() {

    if(this.formGroupBusqueda?.valid){
      this.onSearch(this.formGroupBusqueda.value);
    }
    
  }

  onSubmitSolicitarDias(){
    if(this.formGroupSolicitarDias?.valid){
      this.onRequestDays(this.formGroupSolicitarDias.value);
    }
  }
}
