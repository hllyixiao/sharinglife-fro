import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { environment as env } from '../../environments/environment';

@Injectable()
/**
* 主要对token管理
*/
export class AuthService {

  private _jwtUser: string;

  constructor() {
    this.login();
  }

  getToken() {
    return this._jwtUser;
  }

  logout() {
    this._jwtUser = '';
  }

  loggedIn() {
    return this._jwtUser; // tokenNotExpired('jwtUser', this._jwtUser);
  }

  updateJwtUserCookie(jwtUser: string) {
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 30  * 60 * 1000); // 设置cookie超时 用户重新登陆
    document.cookie = `jwtUser=${jwtUser}; Path=/; Expires=${expiresDate.toUTCString()}`;
  }

  login() {
    // 检查 Jwt Cookie
    const jwtUserCookie = this.getJwtUserCookie();
    if (jwtUserCookie) { // && tokenNotExpired('jwtUser', jwtUserCookie)
      this._jwtUser = jwtUserCookie;
      if (env.production) {
        this.deleteJwtUserCookie();
      }
      return true;
    }
    return false;
  }

  private getJwtUserCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)jwtUser\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }

  private deleteJwtUserCookie() {
    document.cookie = 'jwtUser=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }

}
