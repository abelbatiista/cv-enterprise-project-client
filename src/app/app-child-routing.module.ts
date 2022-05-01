import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutingModule } from './feature/page/page-routing.module';
import { AuthRoutingModule } from './feature/auth/auth-routing.module';
import { ExceptionModule } from './feature/exception/exception.module';
import { ExceptionRoutingModule } from './feature/exception/exception-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    AuthRoutingModule,
    ExceptionRoutingModule,
    PageRoutingModule
  ],
})
export class AppChildRoutingModule {}
