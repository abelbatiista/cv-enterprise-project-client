import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

import {
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  SubHeaderComponent
} from './shared.index';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SubHeaderComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SubHeaderComponent
  ]
})
export class SharedModule { }
