import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicProfileComponent } from './clinic-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicProfileComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicProfileRoutingModule { }
