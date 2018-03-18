import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// service
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ArticleService } from './article.service';
import { HttpRequestInterceptor } from '../_interceptor/httpRequestInterceptor.interceptor';
import { HttpResponseInterceptor } from '../_interceptor/httpResponseInterceptor.interceptor';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { UserService } from './user.service';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
    AuthGuardService,
    AuthService,
    ArticleService,
    LoginService,
    RegisterService,
    UserService
  ]
})
export class CoreModule { }
