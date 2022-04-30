import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'httpclient',
    loadChildren: () => import('./modules/application/items/items.module')
      .then(mod => mod.ItemsModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./modules/application/example-forms/tutorial.module')
      .then(mod => mod.TutorialModule)
  },
  {
    path: 'components',
    loadChildren: () => import('./modules/application/example-components/tutorial.module')
      .then(mod => mod.TutorialModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./modules/application/example-services/tutorial.module')
      .then(mod => mod.TutorialModule)
  },
  {
    path: 'bootstrap',
    loadChildren: () => import('./modules/application/example-bootstrap/tutorial.module')
      .then(mod => mod.TutorialModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./modules/general/contact/contact.module')
      .then(mod => mod.ContactModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/general/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/general/signup/signup.module')
      .then(mod => mod.SignupModule)
  },

  {
    path: 'list/:especialidade/:municipio',
    loadChildren: () => import('./modules/general/doctor-list/doctor-list.module')
      .then((m) => m.DoctorListModule),
  },

  {
    path: 'perguntas-respostas',
    loadChildren: () => import('./modules/general/questions-answers/questions-answers.module')
      .then((m) => m.QuestionsAnswersModule),
  },

  {
    path: 'doctor/:nome/:especialidade/:municipio',
    loadChildren: () => import('./modules/general/doctor-profile/doctor-profile.module')
      .then((m) => m.DoctorProfileModule),
  },
  {
    path: 'clinic/:nome',
    loadChildren: () => import('./modules/general/clinic-profile/clinic-profile.module')
      .then((m) => m.ClinicProfileModule),
  },

  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }