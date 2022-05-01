import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  NotFoundComponent
} from './exception.index';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExceptionChildRoutingModule {}
