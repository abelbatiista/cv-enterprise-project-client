import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthModule,
  ExceptionModule,
  PageModule
} from './feature.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AuthModule,
    ExceptionModule,
    PageModule
  ]
})
export class FeatureModule { }
