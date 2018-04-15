import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { User } from '../_models/user';

import { environment as env} from '../../environments/environment';

@Component({
  templateUrl: './my-management.component.html',
  styleUrls: ['./my-management.component.scss']
})
export class MyManagementComponent implements OnInit {

  public user: User;
  public envImgUrl = env.imgUrl;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
