import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment as env} from '../../environments/environment';

import * as _ from 'lodash';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    // constructor(private auth: AuthService) {}
    // const authHeader = this.auth.getAuthorizationHeader();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            setHeaders: { // req.clone({headers: req.headers.set('Authorization', authHeader)});
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
             url: env.apiProxyUrl + req.url
        });
        return next.handle(cloneReq);
    }
}
