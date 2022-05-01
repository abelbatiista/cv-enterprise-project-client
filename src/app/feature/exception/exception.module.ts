import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionRoutingModule } from './exception-routing.module';
import { ExceptionComponent } from './exception.component';

import {
  NotFoundComponent
} from './exception.index';

@NgModule({
  declarations: [
    ExceptionComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ExceptionRoutingModule
  ],
  exports: [
    ExceptionComponent
  ]
})
export class ExceptionModule { }
