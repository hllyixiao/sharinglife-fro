import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Register } from '../../_models/register';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }
  /**
  *	@ param register注册用户信息
  */
  clientRegister(register: Register): Observable<any> {
    return this.http.post('sl/api/lr/register', register);
  }
}
