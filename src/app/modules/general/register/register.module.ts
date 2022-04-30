import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelect2Module } from 'ng-select2';
import { AgmCoreModule } from '@agm/core';
import { MensagemComponent } from '../mensagem/mensagem.component';


@NgModule({
  declarations: [
    RegisterComponent,
    MensagemComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelect2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class RegisterModule { }
