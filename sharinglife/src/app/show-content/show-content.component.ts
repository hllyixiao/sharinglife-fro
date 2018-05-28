import { Component, OnInit, ElementRef, AfterViewChecked} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { ArticleService } from '../core/article.service';
import { Article } from '../_models/article';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent implements OnInit, AfterViewChecked {

  public articleId: number;
  public article;
  public rFragment;
  public likesed = false;
  public articleLoaded;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private eleRef: ElementRef
  ) { }

  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get('articleId'));
    this.rFragment =  this.route.snapshot.fragment;
    this.article = {title: ''};
    this.route.queryParams.mergeMap( params => {
      if (params && params.status === '2') {
        return this.articleService.getpublishbyid(this.articleId);
      }else {
        return this.articleService.getArticleById(this.articleId);
      }
    }).subscribe(
        req => {
        this.article = req;
        if (this.rFragment === 'likes') {
          this.articleLoaded = 'loaded';
        }
      }
    );
  }

  addLikes() {
    this.articleService.addLike(this.articleId, 1).subscribe(
      req => this.likesed = true
    );
  }

  delLikes() {
    this.articleService.delLike(this.articleId, 1).subscribe(
      req => this.likesed = false
    );
  }

  ngAfterViewChecked () {
      if (this.articleLoaded === 'loaded') {
        const likesTop = this.eleRef.nativeElement.querySelector('#likes').offsetTop;
        setTimeout(window.scrollTo(0, likesTop - 220), 10);
        this.articleLoaded = '';
      }
  }
}
