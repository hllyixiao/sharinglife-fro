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
  * @根据用户Id查询所用该用户的文章草稿
  */
  getAllDraft(userId: number): Observable<any> {
    return this.http.get('sl/api/article/getalldraft?userId=' + userId);
  }

  /**
  * @根据文章Id获取文章
  */
  getArticleById(articleId: number): Observable<any> {
    return this.http.get('/sl/api/article/getbyid/' + articleId);
  }
  /**
  * @根据用户Id获取部分文章
  */
  draftchunk(chunkInfo): Observable<any> {
    return this.http.post('sl/api/article/draftchunk', chunkInfo);
  }

  /**
  * @根据文章Id刪除文章
  */
  deleteArticleById(articleId: number): Observable<any> {
    return this.http.get('sl/api/article/deletearticlebyid?articleId=' + articleId);
  }
}
