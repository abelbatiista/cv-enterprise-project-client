import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionComponent } from './exception.component';

const routes: Routes = [
  {
    path: 'exception',
    component: ExceptionComponent,
    canActivate: [],
    canLoad: [],
    loadChildren: () => import('./exception-child-routing.module')
      .then((module: any): any => { 
        return module.ExceptionChildRoutingModule; 
      })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }
