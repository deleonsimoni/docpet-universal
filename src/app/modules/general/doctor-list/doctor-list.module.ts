import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorListRoutingModule } from './doctor-list-routing.module';
import { DoctorListComponent } from './doctor-list.component';


@NgModule({
  declarations: [
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    DoctorListRoutingModule
  ]
})
export class DoctorListModule { }
