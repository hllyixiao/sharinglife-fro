import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class UserService {
  user: User;

  constructor() { }
}
