import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpRequestInterceptor } from '../_interceptor/httpRequestInterceptor.interceptor';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    LoginService,
    RegisterService
  ]
})
export class CoreModule { }
