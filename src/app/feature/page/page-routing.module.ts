import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page.component';
import { PageGuard } from '../../core/guard/page/page.guard';

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    canActivate: [PageGuard],
    canLoad: [PageGuard],
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
