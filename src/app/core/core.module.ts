import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  NullablePipe, UnderMaintenanceComponent
} from './core.index';

@NgModule({
  declarations: [
    NullablePipe,
    UnderMaintenanceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    NullablePipe,
    UnderMaintenanceComponent
  ]
})
export class CoreModule { }
