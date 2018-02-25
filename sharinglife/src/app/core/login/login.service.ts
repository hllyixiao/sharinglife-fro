import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  /**
  *	@ param clientLogin用户登陆
  */
  clientLogin(login) {
    return this.http.post('api/client/login', login);
  }
}
