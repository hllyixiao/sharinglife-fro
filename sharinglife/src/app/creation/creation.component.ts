import { Component, OnInit, ElementRef } from '@angular/core';
import * as Editor from 'wangEditor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ArticleService } from '../core/article.service';
import { EditorConfig } from '../_models/editor-config';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public editor;
  public article = {
    title: '',
    content: '',
    userId: 0
  };
  public hideContentPlaceholder = false;
  public hideWarningContent = true;
  public warningContent = '';

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private eleRef: ElementRef) { }

  ngOnInit() {
    this.initWangEditor();
    this.hideHint();
    //TODO this.article.userId = this.userService.user.id;
  }

  initWangEditor() {
    const thisComp = this;
    this.editor = new Editor('#creation-write');
    this.editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    this.editor.customConfig.uploadImgServer = 'sl/api/article/addarticlepicture';
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.withCredentials = true;
    this.editor.customConfig.uploadImgMaxSize = 9 * 1024 * 1024; // 图片大小
    this.editor.customConfig.uploadImgTimeout = 10000;
    this.editor.customConfig.uploadImgParams = {
      'userId': 1, //TODO this.userService.user.id,
      'articleId': 123012
    };

    this.editor.customConfig.customAlert = function (info) {
      thisComp.hideWarningContent = false;
      thisComp.warningContent = info;
    };

    this.editor.customConfig.onchange = function (html) {
      Observable.interval(300).take(5).debounceTime(5000).subscribe(
        () => thisComp.hideWarningContent = true
      );
    };
    this.editor.create();
  }

  // 隐藏富文本框提示语
  hideHint() {
    const thisComp = this;
    this.eleRef.nativeElement.querySelector('#creation-write div[id^="text"]').addEventListener('keyup', function($event){
        thisComp.hideContentPlaceholder = $event.target.innerHTML === '<p><br></p>' ? false : true;
    });
  }

  saveArticle() {
    this.createArticle(this.editor.txt.html());
  }

  createArticle(html) {
    this.article.content = html;
    this.articleService.addArticle(this.article).subscribe(
      req => console.log(req)
    );
  }

  // 回车键不让输入
  stopDefaultBehavior($event: any) {
    if ($event.keyCode === 13) {
      $event.preventDefault();
    }
    this.article.title = $event.target.innerText;
  }
}
