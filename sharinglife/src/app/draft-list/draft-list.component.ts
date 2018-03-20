import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

import { ArticleService } from '../core/article.service';
import { UserService } from '../core/user.service';

import { Article } from '../_models/article';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {

  public itemId = 51231;
  public deleteArticleId: number;
  public draftList = [
    {
      id: 1234,
      title: 'title_1',
      contentTxt: '我們的世界是如此的美麗，我要...',
      length: 20,
      createTime: 1,
      titleImg: '/assets/img/home-nav-logo.png'
    },
    {
      id: 1235,
      title: 'title_2',
      contentTxt: '我們的世界是如此的美麗，我要去往北京...',
      length: 21,
      createTime: 3,
      titleImg: ''
    },
    {
      id: 1236,
      title: 'title_3',
      contentTxt: '我們的世界是如此的美麗，我要去往北京，看秋后的雪飘...',
      length: 28,
      createTime: 2,
      titleImg: '/assets/img/home-nav-logo.png'
    }
  ];

  @ViewChild('deleteArticleModal') deleteArticleModal: ModalDirective;

  constructor(
    private articleService: ArticleService,
    private userService: UserService) { }

  ngOnInit() {
    this.articleService.getAllDraft(2).subscribe( // this.userService.user.id
      req => console.log(req)
    );
  }

 deleteArticle(articleId: number) {

console.log(this.draftList)
  this.articleService.deleteArticleById(articleId).subscribe(
      req => {
        this.deleteArticleModal.hide();
        this.draftList = _.partition(this.draftList, {'id': articleId})[1];
      },
      err => console.log(err)
   );
 }

 showDeleteModal(articleId: number) {
  this.deleteArticleId = articleId;
  this.deleteArticleModal.show();
 }
}
