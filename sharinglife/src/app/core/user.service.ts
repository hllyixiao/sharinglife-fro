import { Injectable } from '@angular/core';

import { User } from '../_models/user'

@Injectable()
export class UserService {
  user: User;

  constructor() { }

}
