import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicProfileRoutingModule } from './clinic-profile-routing.module';
import { ClinicProfileComponent } from './clinic-profile.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    ClinicProfileComponent
  ],
  imports: [
    CommonModule,
    ClinicProfileRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class ClinicProfileModule { }
