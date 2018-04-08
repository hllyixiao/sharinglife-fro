import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';

import { ArticleService } from '../core/article.service';
import { UserService } from '../core/user.service';

import { Article } from '../_models/article';
import { environment as env} from '../../environments/environment';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  public deleteArticleId: number;
  public envImgUrl = env.imgUrl;
  public hasDataLoad = true;
  public articleReqObj = {
    status: 2, // 0:删除 , 1:草稿,  2: 发布
    page: 1,
    limit: 3,
    userId: -1
  };
  public dispalyList = [
  {
    articleId: 1209,
    title: '我们的世界',
    displayContextTxt: `老伴，茶已經給你泡好，可以喝了！”我正在後院打太極，前廳傳來老婆子那破鑼般的叫喊声。 “知道了，馬上就過去，整天叨叨叨的，煩不煩啊？”我應了一聲，收了手勢，深吸一口氣，踱步...`,
    displayUpdateTime: '1小时前',
    firstImg: '/assets/img/show.jpg'
    },
  {
    articleId: 1233,
    title: '如此美丽',
    displayContextTxt: `关于我✨ 98年，一枚爱文字的南方姑娘(家乡湖北)，法律系在读大学生，坐标济南。 爱笑，因为坚信“爱笑的女孩运气不会太差”(ฅ>ω<*ฅ) 爱交朋友，因为明白了世界上有很多优...`,
    displayUpdateTime: '2018-04-04'
  }];
  public category = 1; // 1: 文章 2: 图片 3: 视频
  public showCategoryTxt = '文章';
  public showStatusTxt = '已发布';
  public user;
  public pages = 0;

  @ViewChild('deleteArticleModal') deleteArticleModal: ModalDirective;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private elef: ElementRef) { }

  ngOnInit() {
    this.articleReqObj.userId = 2; // TODO this.userService.user.id;
    this.user = this.userService.user;
    this.articleList();
    this.routeChange();
    this.scrollLoad();
  }

  routeChange() {
    this.router.events.subscribe(event => {
      if ( event instanceof NavigationEnd ) {
        this.initReqInfo();
        this.articleList();
      }
    });
  }

  articleList() {
    this.articleService.getbyuserid(this.articleReqObj).subscribe(
      resp => {
        this.dispalyList = resp.datas;
        this.pages = resp.pages;
      }
    );
  }

 initReqInfo() {
  const currentUrl = location.href;

  if (_.endsWith(currentUrl, 'article/published')) {
    this.category = 1;
    this.articleReqObj.status = 2;
    this.showCategoryTxt = '文章';
    this.showStatusTxt = '已发布';
  }
  if (_.endsWith(currentUrl, 'article/draft')) {
    this.category = 1;
    this.articleReqObj.status = 1;
    this.showCategoryTxt = '文章';
    this.showStatusTxt = '草稿';
  }
  if (_.endsWith(currentUrl, 'article/recycle')) {
    this.category = 1;
    this.articleReqObj.status = 0;
    this.showCategoryTxt = '文章';
    this.showStatusTxt = '回收站';
  }
  if (_.endsWith(currentUrl, 'image/published')) {
    this.category = 2;
    this.articleReqObj.status = 2;
    this.showCategoryTxt = '图片';
    this.showStatusTxt = '已发布';
  }
  if (_.endsWith(currentUrl, 'image/draft')) {
    this.category = 2;
    this.articleReqObj.status = 1;
    this.showCategoryTxt = '图片';
    this.showStatusTxt = '草稿';
  }
  if (_.endsWith(currentUrl, 'image/recycle')) {
    this.category = 2;
    this.articleReqObj.status = 0;
    this.showCategoryTxt = '图片';
    this.showStatusTxt = '回收站';
  }
  if (_.endsWith(currentUrl, 'video/published')) {
    this.category = 3;
    this.articleReqObj.status = 2;
    this.showCategoryTxt = '视频';
    this.showStatusTxt = '已发布';
  }
  if (_.endsWith(currentUrl, 'video/draft')) {
    this.category = 3;
    this.articleReqObj.status = 1;
    this.showCategoryTxt = '视频';
    this.showStatusTxt = '草稿';
  }
  if (_.endsWith(currentUrl, 'video/recycle')) {
    this.category = 3;
    this.articleReqObj.status = 0;
    this.showCategoryTxt = '视频';
    this.showStatusTxt = '回收站';
  }
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
          this.articleService.getbyuserid(this.articleReqObj).subscribe( // this.userService.user.id
            resp => this.dispalyList = _.concat(this.dispalyList, resp.datas)
          );
        }
        if (this.pages === this.articleReqObj.page ) {
          this.hasDataLoad = false;
        }
    });
 }

 deleteArticle(articleId: number) {
  this.articleService.deleteArticleByIds([articleId]).subscribe(
      req => {
        this.deleteArticleModal.hide();
        this.articleList();
      },
      err => console.log(err)
   );
 }

 showDeleteModal(articleId: number) {
  this.deleteArticleId = articleId;
  this.deleteArticleModal.show();
 }
}
