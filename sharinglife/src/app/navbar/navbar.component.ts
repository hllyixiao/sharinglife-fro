import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { User } from '../_models/user';

import { environment as env} from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: User;
  public envImgUrl = env.imgUrl;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
