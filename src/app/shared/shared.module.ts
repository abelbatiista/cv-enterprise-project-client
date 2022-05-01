import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FooterComponent,
  HeaderComponent,
  SidebarComponent
} from './shared.index';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }