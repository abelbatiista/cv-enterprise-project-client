import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  NullablePipe
} from './core.index';

@NgModule({
  declarations: [
    NullablePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    NullablePipe
  ]
})
export class CoreModule { }
