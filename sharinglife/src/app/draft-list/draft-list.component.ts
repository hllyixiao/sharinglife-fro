import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../core/article.service';

import { Article } from '../_models/article';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {

  public itemId = 51231;
  public articleList: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllDraft(2).subscribe(
      req => console.log(req)
    );
  }

}
