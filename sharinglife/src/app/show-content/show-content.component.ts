import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent implements OnInit {

  public article = {
    title: '我们的世界, 如此美丽',
    contentHtml: `<p>开始我们的任务</p><p><img src="https://ubmcmm.baidustatic.com/media/v1/0f000Aq54AoT67ue4OcX3s.jpg" style="max-width:100%;"><br></p><div><div><p>1.买会员是你的权利，说破了就是一笔买卖，合同都签了就安心做乙方该做的事，在没有违背合同的情况下请尊重甲方。</p><p>2.会员赋予你的权利里没有装逼。</p><p>3.不是买了会员就说明你写得好，就像某Q会员只能提升你的等级而无法提升你的社会地位。</p><p>4.虚拟世界一样有能治你的人。</p><p>5.要是不喜欢简书的书，那就不喜欢。书是用来读的，不是用来炫耀的。国家图书馆里的书籍数以万计，不是每个人都会喜欢，但没有谁会站在图书馆门口骂馆长，“你丫什么破书！”</p><p>6.我建议你看看尊享会员都在干嘛，我们买了会员是为了充实自己，不是特娘的在人家工作人员面前嘚瑟。</p><p>7.闭上嘴巴，学会用脑思考。</p></div><br><br>作者：八色<br>链接：https://www.jianshu.com/p/f7210530bb53<br>來源：简书<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div>`
  };
  constructor() { }

  ngOnInit() {

  }

}
