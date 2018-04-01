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

  /**
  * @更新文章
  */
  updateArticle(article): Observable<any> {
    return this.http.post('sl/api/article/updatearticle', article);
  }

  /**
  * @根据文章Id获取文章
  */
  getArticleById(articleId: number): Observable<any> {
    return this.http.get('/sl/api/article/getbyid/' + articleId);
  }
  /**
  * @根据用户Id, 文章status 获取部分文章
  */
 getbyuserid(chunkInfo): Observable<any> {
    const url = `sl/api/article/getbyuserid?limit=${chunkInfo.limit}
      &page=${chunkInfo.page}&status=${chunkInfo.status}&userId=${chunkInfo.userId}`;
    return this.http.get(url);
  }

  /**
  * @根据文章Id刪除文章
  */
  deleteArticleById(articleId: number): Observable<any> {
    return this.http.get('sl/api/article/deletebyid?articleId=' + articleId);
  }
}
