import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module'
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing/routing.module';
// component
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedbackComponent } from './feedback/feedback.component';



@NgModule({
  imports: [
    AppBootstrapModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FeedbackComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
