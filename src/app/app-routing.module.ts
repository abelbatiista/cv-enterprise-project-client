import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppChildRoutingModule } from './app-child-routing.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page' },
  { path: '**', redirectTo: 'exception', pathMatch: 'full' }
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
    AppChildRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
