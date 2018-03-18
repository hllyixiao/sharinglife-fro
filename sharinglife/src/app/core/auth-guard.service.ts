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
    if (this.auth.loggedIn()) {
      return true;
    } else {
      window.location.href = 'login';
      return false;
    }
  }
}
