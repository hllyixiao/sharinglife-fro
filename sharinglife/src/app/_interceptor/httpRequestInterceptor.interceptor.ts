import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    // constructor(private auth: AuthService) {}
    // const authHeader = this.auth.getAuthorizationHeader();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            setHeaders: { // req.clone({headers: req.headers.set('Authorization', authHeader)});
                'Accept-Charset': 'utf-8',
                'Accept-Language': 'en-us',
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
             url: environment.APIUrl + req.url
        });
        return next.handle(cloneReq);
    }
}

