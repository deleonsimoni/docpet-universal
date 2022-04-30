import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsAnswersRoutingModule } from './questions-answers-routing.module';
import { QuestionsAnswersComponent } from './questions-answers.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    QuestionsAnswersComponent
  ],
  imports: [
    CommonModule,
    QuestionsAnswersRoutingModule,
    NgxSelectModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxMaskModule.forChild(),
  ]
})
export class QuestionsAnswersModule { }
