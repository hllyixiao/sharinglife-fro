import { Component, OnInit, ViewChild, ElementRef, QueryList } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import Cropper from 'cropperjs';
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
    limit: 3
  };
  public dispalyList = [];
  public category = 1; // 1: 文章 2: 图片 3: 视频
  public showCategoryTxt = '文章';
  public showStatusTxt = '已发布';
  public crooper_options = {
    aspectRatio: 5 / 4,
    canvasWidth: 150,
    canvasHeight: 120
  };
  public pages = 0;
  public user;

  @ViewChild('deleteArticleModal') deleteArticleModal: ModalDirective;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private elef: ElementRef) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.articleList();
    this.routeChange();
    this.scrollLoad();
  }

  routeChange() {
    this.router.events.subscribe(event => {
      if ( event instanceof NavigationEnd ) {
        this.articleReqObj.page = 1;
        this.initReqInfo();
        this.articleList();
      }
    });
  }

  articleList() {
    this.articleService.listbyuserid(this.articleReqObj).subscribe(
      resp => {
        this.dispalyList = this.cropperImage(resp.datas);
        this.pages = resp.pages;
       });
  }

  cropperImage (articleList) {
    const that = this;
    _.forEach(articleList, function(artilce){
      const drawIma = { sx: 0, sy: 0, sw: 0, sh: 0, dx: 0, dy: 0, dw: 0, dh: 0};
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous'); // 允许图片
      image.src = artilce.firstImg;

      const canvas = document.createElement('canvas');
      canvas.width = that.crooper_options.canvasWidth;
      canvas.height = that.crooper_options.canvasHeight;
      const ctx = canvas.getContext('2d');

      image.onload = function(){
        if ( image.width / image.height > that.crooper_options.aspectRatio) { // width/height > aspectRatio
          drawIma.sx = (image.width - image.height * that.crooper_options.aspectRatio) / 2;
          drawIma.sy = 0;
          drawIma.sw = image.width - 2 * drawIma.sx;
          drawIma.sh = image.height;
          drawIma.dx = 0;
          drawIma.dy = 0;
          drawIma.dw = that.crooper_options.canvasWidth;
          drawIma.dh = that.crooper_options.canvasHeight;
        }else {  // width/height <= aspectRatio
          drawIma.sx = 0;
          drawIma.sy = (image.height - image.width / that.crooper_options.aspectRatio) / 2;
          drawIma.sw = image.width;
          drawIma.sh = image.height - 2 * drawIma.sy ;
          drawIma.dx = 0;
          drawIma.dy = 0;
          drawIma.dw = that.crooper_options.canvasWidth;
          drawIma.dh = that.crooper_options.canvasHeight;
        }
        ctx.drawImage(image, drawIma.sx, drawIma.sy, drawIma.sw, drawIma.sh, drawIma.dx, drawIma.dy, drawIma.dw, drawIma.dh);
        artilce['cropperImg'] = canvas.toDataURL(_.last(artilce.firstImg.split('.')));
      };
    });
    return articleList;
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
          this.articleService.listbyuserid(this.articleReqObj).subscribe( // this.userService.user.id
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

 deleteArticle(articleId: number) {
  this.articleService.deleteArticleByIds([articleId]).subscribe(
      req => { // 修改下删除后 获取下一个替换删除了的数据？
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
