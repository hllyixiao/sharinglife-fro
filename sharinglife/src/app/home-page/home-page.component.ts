import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
      title: '我们的世界',
      content: '',
      contentTxt: '我們的世界是如此的美麗，我要我們的世界是如此的美麗，我要去往北京,我們的世界是如此的美麗，我要去往北京我們的世界是如此的美麗，我要去往北京...',
      length: 20,
      createTime: 1,
      titleImg: '/assets/img/home-nav-logo.png'
    }];
    public htmlInput = '';
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(moke.content);
    this.htmlInput = moke.content;

    this.user = this.userService.user;
  }

}

const moke = {
  content: `<div><div>我今年35岁，男，至今未婚。<br>每次回老家过春节，亲戚问起婚事我总回答还没遇上心动的，亲戚总是一副还不是因为你穷的眼神看我。<br>今年回老家过年前，我立刻去4S店全款提了一辆雷克萨斯ES回来，就是为了证明老子不是穷确实是还没找到心仪的妹子！<br>现在好了，亲戚觉得我是一个宁愿花三四十万买辆车也不愿意付首付买套房的傻逼。<br>我已成功从亲戚看我穷的眼神变成了看我傻的眼神了。</div><br><br>作者：匿名用户<br>链接：https://www.zhihu.com/question/267104067/answer/320796348<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div><p><img src="http://a.hiphotos.baidu.com/image/h%3D300/sign=ea4799136ed0f703f9b293dc38fa5148/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg" style="max-width: 100%;"><br></p><div><div>没想到点赞的人那么多，其实没买房先买车的人我身边有很多，只不过车价有区别而已，所有评论我都看了，就不一一回复了，谢谢，大家把这个当段子看就好 <p></p>对待同样一件事，每个人有每个人的解决方法，至于评论里的喷子，我想说句不要把你的价值观强加在我身上，我先买车我就傻了吗，下了班回去，无论租的房子还是买的房子，也都是空荡荡的，对于我来说租房买房没多大区别。<br>其实一开始就是纯粹一调侃，图大家一乐，没想涉及那么严肃的问题。<br>不管你做什么事，只要不犯法，不妨碍到他人，大伙高兴怎么做就怎么做，人生艰难，要学会取悦自己</div><br><br>作者：匿名用户<br>链接：https://www.zhihu.com/question/267104067/answer/320796348<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div>`,
  contentTxt: `我今年35岁，男，至今未婚。每次回老家过春节，亲戚问起婚事我总回答还没遇上心动的，亲戚总是一副还不是因为你穷的眼神看我。今年回老家过年前，我立刻去4S店全款提了一辆雷克萨斯ES回来，就是为了证明老子不是穷确实是还没找到心仪的妹子！现在好了，亲戚觉得我是一个宁愿花三四十万买辆车也不愿意付首付买套房的傻逼。我已成功从亲戚看我穷的眼神变成了看我傻的眼神了。没想到点赞的人那么多，其实没买房先买车的人我身边有很多，只不过车价有区别而已，所有评论我都看了，就不一一回复了，谢谢，大家把这个当段子看就好 对待同样一件事，每个人有每个人的解决方法，至于评论里的喷子，我想说句不要把你的价值观强加在我身上，我先买车我就傻了吗，下了班回去，无论租的房子还是买的房子，也都是空荡荡的，对于我来说租房买房没多大区别。其实一开始就是纯粹一调侃，图大家一乐，没想涉及那么严肃的问题。不管你做什么事，只要不犯法，不妨碍到他人，大伙高兴怎么做就怎么做，人生艰难，要学会取悦自己`
};


