import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing/routing.module';
// component
import { AppComponent } from './app.component';
import { CreationComponent } from './creation/creation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ShowListComponent } from './show-list/show-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyManagementComponent } from './my-management/my-management.component';

import { ImageCropperComponent } from 'ng2-img-cropper';
import { PersonalInformationComponent } from './personal-information/personal-information.component';

@NgModule({
  imports: [
    AngularCropperjsModule,
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
    CreationComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FeedbackComponent,
    ShowListComponent,
    NavbarComponent,
    MyManagementComponent,
    ImageCropperComponent,
    PersonalInformationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
