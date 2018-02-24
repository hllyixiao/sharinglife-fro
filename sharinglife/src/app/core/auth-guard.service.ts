import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment';
@Injectable()
export class AuthGuardService implements CanActivate {
  private server: string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (route && route.queryParams && route.queryParams.server) {
      this.server = route.queryParams.server;
    }

    if (this.auth.loggedIn()) {
      return true;
    } else {
      if (this.auth.login()) {
        return true;
      } else {
        /*if (this.server) {
          window.location.href = env.ssoUrl + route.url[0].path + '&server=' + this.server;
        } else {
          window.location.href = env.ssoUrl + route.url[0].path;
        }*/
        return false;
      }
    }
  }
}
