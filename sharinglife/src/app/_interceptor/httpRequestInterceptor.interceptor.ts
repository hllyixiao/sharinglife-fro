import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment as env} from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import * as _ from 'lodash';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
     constructor(private auth: AuthService, private userService: UserService) {}
    // const authHeader = this.auth.getAuthorizationHeader();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.userService.user) {
            this.auth.updateJwtUserCookie(this.userService.user.name);
        }
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
