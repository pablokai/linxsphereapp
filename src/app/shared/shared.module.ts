import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [ModalComponent, FilterPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalComponent,
    FilterPipe
  ]
})
export class SharedModule { }
