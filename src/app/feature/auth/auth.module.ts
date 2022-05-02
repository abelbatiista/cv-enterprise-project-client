import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../core/interceptor/auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  SignInComponent,
  SignUpComponent
} from './auth.index';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, multi: true
    }
  ]
})
export class AuthModule { }
