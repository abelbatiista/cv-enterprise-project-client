import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SubHeaderComponent
  ]
})
export class SharedModule { }
