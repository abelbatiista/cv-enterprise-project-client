import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  SignInComponent, SignUpComponent
} from './auth.index'

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthChildRoutingModule {}
