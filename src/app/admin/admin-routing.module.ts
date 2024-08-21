import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {routes} from './admin.routes'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)//setea enrutamiento para modulos hijo, setea propio enrutamiento
  ], 
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
