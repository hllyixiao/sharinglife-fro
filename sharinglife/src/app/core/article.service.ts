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
    return this.http.post('sl/api/article/add', article);
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
 listbyuserid(chunkInfo): Observable<any> {
    const url = `/sl/api/article/listbyuserid?limit=${chunkInfo.limit}
      &page=${chunkInfo.page}&status=${chunkInfo.status}`;
    return this.http.get(url);
  }

  /**
  * @根据文章Id刪除文章
  */
  deleteArticleByIds(articleIds: Array<number>): Observable<any> {
    return this.http.post('sl/api/article/deletebyids', articleIds);
  }

   /**
    * @设置用户头像
    */
   setavatar(avatar: FormData): Observable<any> {
    return this.http.post('sl/api/user/setavatar', avatar);
  }

  /**
   * @更新用户基本信息
   */
  updateUser(user): Observable<any> {
    return this.http.post('sl/api/user/update', user);
  }
}
