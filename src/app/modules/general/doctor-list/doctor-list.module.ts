import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorListRoutingModule } from './doctor-list-routing.module';
import { DoctorListComponent } from './doctor-list.component';
import { NgSelect2Module } from 'ng-select2';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    DoctorListRoutingModule,
    NgSelect2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),

  ]
})
export class DoctorListModule { }
