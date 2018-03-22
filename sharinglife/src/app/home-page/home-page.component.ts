import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';

import { User } from '../_models/user';

import { environment as env} from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User;
  public envImgUrl = env.imgUrl;
  public draftList = [{
      id: 1234,
      title: 'title_1',
      contentTxt: '我們的世界是如此的美麗，我要我們的世界是如此的美麗，我要去往北京,我們的世界是如此的美麗，我要去往北京我們的世界是如此的美麗，我要去往北京...',
      length: 20,
      createTime: 1,
      titleImg: '/assets/img/home-nav-logo.png'
    }]
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
