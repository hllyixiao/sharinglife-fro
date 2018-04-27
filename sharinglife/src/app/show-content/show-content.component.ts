import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ArticleService } from '../core/article.service';
import { Article } from '../_models/article';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent implements OnInit {

  public articleId: number;
  public article;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get('articleId'));
    this.article = {title: ''};
    this.articleService.getArticleById(this.articleId).subscribe(
        req => this.article = req
    );
  }

}
