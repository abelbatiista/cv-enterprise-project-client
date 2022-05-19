import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

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
