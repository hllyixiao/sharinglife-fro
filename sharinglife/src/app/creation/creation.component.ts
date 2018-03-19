import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Editor from 'wangEditor';
import { Subject } from 'rxjs/Subject';
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
    length: 0,
    userId: 0
  };
  public hideContentPlaceholder = false;
  public hideWarningContent = true;
  public warningContent = '';
  public articleChangeSubject = new Subject();

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private eleRef: ElementRef) { }

  ngOnInit() {
    this.initWangEditor();
    this.hideHint();
    this.articleChangeSubject.debounceTime(3000).subscribe(
        val => this.createArticle()
    );
    //TODO this.article.userId = this.userService.user.id;
  }

  initWangEditor() {
    const thisComp = this;
    this.editor = new Editor('#creation-write');
    this.editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    this.editor.customConfig.uploadImgServer = 'sl/api/article/addarticlepicture';
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.withCredentials = true;
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; // 图片大小
    this.editor.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传张图片
    this.editor.customConfig.uploadImgTimeout = 10000; // 超时时长 默认10s
    this.editor.customConfig.uploadImgParams = {
      'userId': 1, //TODO this.userService.user.id,
      'articleId': 123012
    };

    this.editor.customConfig.uploadImgHooks = {
      // 服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置,但必须是一个 JSON 格式字符串
      customInsert: function (insertImg, result, editor) {
          const url = result.url;
          insertImg(url);
      }
    };
    // 上传图片的错误提示, 默认使用alert弹出
    this.editor.customConfig.customAlert = function (info) {
      thisComp.hideWarningContent = false;
      thisComp.warningContent = info;
    };

    this.editor.customConfig.onchange = function (html) {
      thisComp.article.content = html;
      thisComp.article.length = thisComp.editor.txt.text().replace(/&nbsp;/g, ' ').length;
      thisComp.articleChangeSubject.next(thisComp.article);
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
    this.article.content = this.editor.txt.html();
    this.article.length = this.editor.txt.text().replace(/&nbsp;/g, ' ').length;
    this.createArticle();
  }

  createArticle() {
    this.articleService.addArticle(this.article).subscribe(
      req => console.log(req)
    );
  }

  // 回车键不让输入
  stopDefaultBehavior($event: any) {
    if ($event.keyCode === 13) {
      $event.preventDefault();
    }
   }

  // 绑定标题输入，并3s不改变自动保存
  bindTitle($event: any) {
    this.article.title = $event.target.innerText;
    this.articleChangeSubject.next(this.article);
  }
}
