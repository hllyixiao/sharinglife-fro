import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  /**
  *	@ param login用户登陆
  */
  login(login): Observable<any> {
    return this.http.post('sl/api/lr/login', login);
  }

  /**
  * @ logout用户登出
  */
  logout(): Observable<any> {
    return this.http.get('sl/api/lr/logout');
  }

  /**
  * @获取登录验证码
  */
  getVerifyCode(): Observable<any> {
    return this.http.get('sl/api/lr/getverifycode');
  }
}
