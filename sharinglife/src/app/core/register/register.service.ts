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
    return this.http.post('sl/api/lr/register', register); // {observe: 'response'}
  }
  /**
  *	@ param 注册名验证是否存在
  */
  isExistname(name: string): Observable<any> {
    return this.http.get('sl/api/lr/isexistname?name=' + name);
  }
 /**
  *	@ param手机号验证是否存在
  */
  isExistpho(phone: string): Observable<any> {
    return this.http.get('sl/api/lr/isexistpho?phone=' + phone);
  }
}
