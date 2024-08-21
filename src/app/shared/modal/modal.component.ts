import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
   @Input() modalSwitch = false; //decorator de entrada, recibe datos del parent
   @Input() mensaje : string = '';
   @Input() estado : boolean = true;
   @Output() outputModalSwitch = new EventEmitter<boolean>;
  //  @Input() redirectUrl : string = '';

  public textoBoton : string = 'Cerrar';
  public color : string = '';



  openModal(){
    this.modalSwitch = true;
  }

  closeModal(){
    this.outputModalSwitch.emit(false);
  }
}
