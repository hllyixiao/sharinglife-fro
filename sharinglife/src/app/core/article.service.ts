import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  /**
  * @新建文章
  */
  addArticle(article): Observable<any> {
    return this.http.post('sl/api/article/addarticle', article);
  }
}
