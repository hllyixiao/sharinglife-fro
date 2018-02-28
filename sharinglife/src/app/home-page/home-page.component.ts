import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';

import { User } from '../_models/user'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
