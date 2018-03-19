import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// component
import { CreationComponent } from '../creation/creation.component';
import { DraftListComponent } from '../draft-list/draft-list.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

// service
import { AuthGuardService } from '../core/auth-guard.service';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'creation', component: CreationComponent}, //, canActivate: [AuthGuardService] },
  { path: 'draftlist', component: DraftListComponent}, //, canActivate: [AuthGuardService] },
  { path: 'edit/:articleId/article', component: CreationComponent}, //, canActivate: [AuthGuardService] },
  // 当URL为空时就会访问那里
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  // 当所请求的URL不匹配前面定义的路由表中的任何路径时，路由器就会选择此路由
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
