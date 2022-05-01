import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [],
    canLoad: [],
    loadChildren: () => import('./auth-child-routing.module')
    .then((module: any): any => { 
      return module.AuthChildRoutingModule; 
    })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
