import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';

import { ArticleService } from '../core/article.service';
import { UserService } from '../core/user.service';

import { Article } from '../_models/article';
import { environment as env} from '../../environments/environment';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {
  public deleteArticleId: number;
  public envImgUrl = env.imgUrl;
  public articleReqObj = {
    status: 2, // 0:删除 , 1:草稿,  2: 发布
    page: 1,
    limit: 3,
    userId: -1
  };
  public draftList = [];
  public pages = 0;

  @ViewChild('deleteArticleModal') deleteArticleModal: ModalDirective;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private elef: ElementRef) { }

  ngOnInit() {
    this.articleReqObj.userId = this.userService.user.id; // this.userService.user.id
    this.articleService.getbyuserid(this.articleReqObj).subscribe(
      resp => {
        this.draftList = _.concat(this.draftList, resp.datas);
        this.pages = resp.pages;
      }
    );
    this.scrollLoad();
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
            resp => this.draftList = _.concat(this.draftList, resp.datas)
          );
        }
    });
 }

 deleteArticle(articleId: number) {
  this.articleService.deleteArticleById(articleId).subscribe(
      req => {
        this.deleteArticleModal.hide();
        this.draftList = [];
        this.articleService.getbyuserid(this.articleReqObj).subscribe(
          resp => {
            this.draftList = _.concat(this.draftList, resp.datas);
            this.pages = resp.pages;
          }
        );
      },
      err => console.log(err)
   );
 }

 showDeleteModal(articleId: number) {
  this.deleteArticleId = articleId;
  this.deleteArticleModal.show();
 }
}
