import { Component } from '@angular/core';
import { Vacaciones } from '../../../interfaces/vacaciones';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../services/vacaciones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-consulta-vacaciones',
  templateUrl: './consulta-vacaciones.component.html',
  styleUrl: './consulta-vacaciones.component.css'
})
export class ConsultaVacacionesComponent {
  
  public modalSwitch : boolean = false;
  public estado : boolean = false;
  public mensaje :string = '';

  public filtro : string = '';
  public listaVacaciones : Vacaciones[] = [];
  public formGroup : FormGroup  = this.formBuilder.group({});
  constructor(private router : Router, private vacacionesService : VacacionesService, private formBuilder : FormBuilder){

  }


  ngOnInit(): void {

    this.formGroup =  this.formBuilder.group({
      fechaSalida : '',
      fechaEntrada: ''
    });

     this.loadVacaciones();
  }

  handleModalSwitch(childData : boolean)  {
    this.modalSwitch = childData;
  }

  loadVacaciones() : void {
    this.vacacionesService.listarVacaciones().subscribe( (response) =>{ 
      this.listaVacaciones = response;
    });

  }

  onDateRange(dataForm : any) : void{


    var filtro = this.listaVacaciones.filter(item => {
      return formatDate(item.fechaSalida, 'yyyy-MM-dd', 'es-AR' ) >= dataForm.fechaSalida && formatDate(item.fechaEntrada, 'yyyy-MM-dd', 'es-AR' ) <= dataForm.fechaEntrada
    });
    this.listaVacaciones = filtro;

  }

  onReset() : void {
    this.loadVacaciones();
    this.formGroup.reset();
  }

  onSubmit() : void{
    if(this.formGroup.valid){
      this.onDateRange(this.formGroup.value);
    }
  }
}
