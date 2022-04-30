import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorListRoutingModule } from './doctor-list-routing.module';
import { DoctorListComponent } from './doctor-list.component';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    DoctorListRoutingModule,
    NgSelect2Module,


  ]
})
export class DoctorListModule { }
