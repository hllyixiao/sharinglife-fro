import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Editor from 'wangEditor';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { ArticleService } from '../core/article.service';
import { EditorConfig } from '../_models/editor-config';
import { UserService } from '../core/user.service';

import { Article } from '../_models/article';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public editor;
  public article: Article = {
    id: -1,
    state: '',
    title: '',
    content: '',
    length: 0,
    userId: -1
  };
  public hideContentPlaceholder = false;
  public hideWarningContent = true;
  public warningContent = '';
  public editTitle = '';
  public articleChangeSubject = new Subject();

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private eleRef: ElementRef,
    private render: Renderer2) { }

  ngOnInit() {
    this.initWangEditor();
    this.hideHint();
    //TODO this.article.userId = this.userService.user.id;
    this.article.id = Number(this.route.snapshot.paramMap.get('articleId'));
    if (this.article.id !== -1) { // 表示当前属于文章编辑状态，等于-1表示新创文章。
      this.articleService.getArticleById(this.article.id).subscribe(
        article => {
          if (article.content !== '<p><br></p>') {
            this.hideContentPlaceholder = true;
          }
          this.editor.txt.html(article.content);
          this.editTitle = article.title;
        }
      );
    }
    this.articleChangeSubject.debounceTime(3000).subscribe(
        val => this.createArticle()
    );
  }

  initWangEditor() {
    const thisComp = this;
    this.editor = new Editor('#creation-write');
    this.editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    this.editor.customConfig.uploadImgServer = 'sl/api/article/addarticlepicture';
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.withCredentials = true;
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; // 图片大小
    this.editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传张图片
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
      thisComp.article.length = this.getPureTxt(this.article.content).length;
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
    this.article.length = this.getPureTxt(this.article.content).length;
    this.createArticle();
  }

  createArticle() {
    this.articleService.addArticle(this.article).subscribe(
      req => console.log(req)
    );
  }

  // 获取富文本框中的纯文本
  getPureTxt(html): string {
    const entity = html.replace(/<[^>]*>/g, ''); // 去除html标签
    const div = this.render.createElement('div');
    div.innerHTML = entity;
    const pureTxt = div.innerText || div.textContent; // html实体字符转换成正常字符
    return pureTxt;
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
