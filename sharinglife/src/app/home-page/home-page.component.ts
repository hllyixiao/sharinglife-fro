import { Component, OnInit, ElementRef } from '@angular/core';

import { ArticleService } from '../core/article.service';
import { CommonFunctionService } from '../core/common-function.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../core/user.service';
import * as _ from 'lodash';
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
  public dispalyList = [];
  public articleReqObj = {
    page: 1,
    limit: 10
  };
  public pages = 0;
  public hasDataLoad = true;
  public options = {
    aspectRatio: 5 / 4,
    canvasWidth: 150,
    canvasHeight: 120
  };
  constructor(
    private articleService: ArticleService,
    private elef: ElementRef,
    private userService: UserService,
    private commonFunc: CommonFunctionService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.articleList();
    this.scrollLoad();
  }

  articleList() {
    this.articleService.list(this.articleReqObj).subscribe(
      resp => {
        this.dispalyList = this.cropperImage(resp.datas);
        this.pages = resp.pages;
       });
  }

  cropperImage (articleList) {
    const that = this;
    _.forEach(articleList, function(article, index){
      if (!!article.firstImg) { // 文章的firstImg图片存在
        articleList[index] = that.commonFunc.cropperImage(article, that.options, article.firstImg);
      }
    });
    return articleList;
  }

  scrollLoad() {
    // throttleTime 发出第一个值，忽略等待时间内发出的值，等待时间过后再发出新值
    Observable.fromEvent(window, 'scroll').throttleTime(1500).subscribe(
      event => {
        const scrollHeight = this.elef.nativeElement.ownerDocument.scrollingElement.scrollHeight;
        const scrollTop = this.elef.nativeElement.ownerDocument.scrollingElement.scrollTop;
        const clientHeight = this.elef.nativeElement.ownerDocument.scrollingElement.clientHeight;
        const srcollBottom = scrollHeight - clientHeight - scrollTop;
        // 滚动到底部一定距离后，追加几条数据
        if (srcollBottom < 800 && this.articleReqObj.page < this.pages) {
          this.articleReqObj.page = this.articleReqObj.page + 1;
          this.articleService.list(this.articleReqObj).subscribe(
            resp => {
              this.dispalyList = _.concat(this.dispalyList, this.cropperImage(resp.datas));
            }
          );
        }
        if (this.pages === this.articleReqObj.page ) {
          this.hasDataLoad = false;
        }
    });
 }

}
