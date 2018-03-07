import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { environment as env } from '../../environments/environment';

@Injectable()
/**
* 主要对token管理
*/
export class AuthService {

  private _jwt: string;

  constructor() {
    this.login();
  }

  getToken() {
    return this._jwt;
  }

  logout() {
    this._jwt = '';
  }

  loggedIn() {
    return tokenNotExpired('jwt', this._jwt);
  }

  login() {
    // 检查 Jwt Cookie
    const jwtCookie = this.getJwtCookie();
    if (jwtCookie && tokenNotExpired('jwt', jwtCookie)) {
      this._jwt = jwtCookie;
      if (env.production) {
        this.deleteJwtCookie();
      }
      return true;
    }
    return false;
  }

  private getJwtCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }

  private deleteJwtCookie() {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }

}
