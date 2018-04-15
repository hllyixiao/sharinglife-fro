import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { LoginService } from '../core/login/login.service';

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
  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  exit() {
    this.loginService.logout().subscribe(
      resp => this.router.navigate(['/login'])
    );
  }
}
