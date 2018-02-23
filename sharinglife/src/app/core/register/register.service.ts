import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Register } from '../../_models/register';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }
  /**
  *	@ param register注册用户信息
  */
  clientRegister(register: Register) {
    return this.http.post('/api/developers/add', register).subscribe();
  }
}
