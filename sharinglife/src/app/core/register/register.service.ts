import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Register } from '../../_models/register';
@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  clientRegister(register: Register) {
  	return this.http.post('/client/register', register); 
  }
}
