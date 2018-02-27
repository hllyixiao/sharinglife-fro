import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx'

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  /**
  *	@ param clientLogin用户登陆
  */
  clientLogin(login): Observable<any> {
    return this.http.post('sl/api/lr/login', login);
  }
}
