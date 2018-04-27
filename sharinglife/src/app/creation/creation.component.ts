import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import * as Editor from 'wangEditor';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import 'rxjs/Rx';

import { ArticleService } from '../core/article.service';
import { UserService } from '../core/user.service';

// class
import { Article } from '../_models/article';
import { EditorConfig } from '../_models/editor-config';
import { environment as env} from '../../environments/environment';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit, AfterViewInit {

  public editor;
  public article: Article = {
    id: 0,
    status: 1, // 0 删除  1 草稿   2 发布
    title: '',
    allowcomments: 0,
    contentHtml: '',
    contentTxt: '',
    contentSize: 0
  };
  public hideContentPlaceholder = false;
  public showWarningContent = false;
  public warningContent = '';
  public editTitle = '';
  public createArticle = true;
  public commentFlag = '1';
  public showImageNav = false;
  public articleChangeSubject = new Subject();

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private eleRef: ElementRef,
    private render: Renderer2,
    private location: LocationStrategy) {
  }

  ngOnInit() {
    this.initWangEditor();
    this.hideHint();
    // TODO this.article.userId = this.userService.user.id;
    this.article.id = Number(this.route.snapshot.paramMap.get('articleId'));
    if (this.article.id > 0) { // 表示当前属于文章编辑状态，等于-1表示新创文章。
      this.createArticle = false;
      this.articleService.getArticleById(this.article.id).subscribe(
        article => {
          if (article.content !== '<p><br></p>') {
            this.hideContentPlaceholder = true;
          }
          this.editor.txt.html(article.contentHtml);
          this.editTitle = article.title;
          this.article.title = article.title;
        }
      );

    }
    // 5分钟后没有事件触发就发送该请求
    this.articleChangeSubject.debounceTime(300000).subscribe(
        val => this.saveArticle()
    );
  }

  initWangEditor() {
    const thisComp = this;
    this.editor = new Editor('#creation-write');
    this.editor.customConfig.menus = EditorConfig.wangEditorConfig.menus;
    this.editor.customConfig.uploadImgServer = 'sl/api/article/addpicture';
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.withCredentials = true;
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; // 图片大小
    this.editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传张图片
    this.editor.customConfig.uploadImgTimeout = 100000; // 超时时长 默认10s
    this.editor.customConfig.uploadImgParams = {
      'articleId': 25 // TODO
    };

    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        if (thisComp.article.id === 0) {
          thisComp.saveArticle();
        }
      },
      // 服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置,但必须是一个 JSON 格式字符串
      customInsert: function (insertImg, result, editor) {
        const imgList = result.datas || [];
        _.forEach(imgList, function(url){
          insertImg(env.imgUrl + url);
        });
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
          thisComp.createArticle = false;
      }
    };
    // 上传图片的错误提示
    this.editor.customConfig.customAlert = function (info) {
      thisComp.showWarningContent = true;
      thisComp.warningContent = info;
    };

    this.editor.customConfig.onchange = function (html) {
      if (thisComp.article.id === 0 && thisComp.createArticle) { // create 立即上传
        thisComp.createArticle = false;
        thisComp.saveArticle();
      }else { //  update延迟5分钟
        thisComp.articleChangeSubject.next(thisComp.article);
      }
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

  // 创建/ 更新文章内容
  saveArticle() {
    this.article.contentHtml = this.editor.txt.html();
    this.article.contentTxt = this.getPureTxt(this.article.contentHtml);
    this.article.contentSize = this.article.contentTxt.length;
    if (this.article.id === 0) { // 新建文章
      this.articleService.addArticle(this.article).subscribe(
        articleId => {
          this.article.id = articleId;
          this.location.pushState('', '' , '../edit/article/' + articleId, ''); // 浏览器不跳转， 改变URL值
        },
        err => this.createArticle = true
      );
    }else { // 更新文章
      this.articleService.updateArticle(this.article).subscribe(
        req => {
          if (this.article.status === 2) {
             this.router.navigate(['/management/article/published']);
          }
        }
      );
    }
  }

  // 发布文章
  publishArticle() {
    this.article.status = 2;
    this.article.allowcomments = Number(this.commentFlag);
    this.saveArticle();
    this.showImageNav = false;
  }

  // 获取富文本框中的纯文本
  getPureTxt(html): string {
    const entity = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').replace(/ /g, ''); // 去除html标签, 去除空格
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

  // 绑定标题输入，并5分钟不改变自动保存
  bindTitle($event: any) {
    this.article.title = $event.target.innerText;
    if (this.article.id === 0 && this.createArticle) { // create 立即上传
      this.createArticle = false;
      this.saveArticle();
    }else { //  update延迟5分钟
      this.articleChangeSubject.next(this.article);
    }
  }

  ngAfterViewInit() {
    // 浏览器关闭，刷新时保存数据
    const that = this;
    this.eleRef.nativeElement.ownerDocument.defaultView.onbeforeunload = function(e){
      return null;
    };
  }
}
