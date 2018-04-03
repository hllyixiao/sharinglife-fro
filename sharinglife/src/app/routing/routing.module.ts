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
import { MyManagementComponent } from '../my-management/my-management.component';

// service
import { AuthGuardService } from '../core/auth-guard.service';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'creation', component: CreationComponent}, // , canActivate: [AuthGuardService] },
  { path: 'edit/article/:articleId', component: CreationComponent}, // , canActivate: [AuthGuardService] },
  { path: 'draftlist', component: DraftListComponent},
  { path: 'management/:userId',
    component: MyManagementComponent, // , canActivate: [AuthGuardService] },
    children: [
    { path: 'article/published', component: DraftListComponent},
    { path: 'article/draft', component: DraftListComponent},
    { path: 'article/recycle', component: DraftListComponent},
    { path: 'image/published', component: DraftListComponent},
    { path: 'image/draft', component: DraftListComponent},
    { path: 'image/recycle', component: DraftListComponent},
    { path: 'video/published', component: DraftListComponent},
    { path: 'video/draft', component: DraftListComponent},
    { path: 'video/recycle', component: DraftListComponent},
    ]},
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
