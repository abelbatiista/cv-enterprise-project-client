import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    canActivate: [],
    canLoad: [],
    loadChildren: () => import('./page-child-routing.module')
    .then((module: any): any => { 
      return module.PageChildRoutingModule; 
    })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
