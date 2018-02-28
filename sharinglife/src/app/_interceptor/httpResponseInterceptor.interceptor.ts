import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/RX';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
        return next.handle(req).catch((err: HttpErrorResponse) => {
            if (err.status >= 200 && err.status < 300) {
                const res = new HttpResponse({
                    body: null,
                    headers: err.headers,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url
                });

                return Observable.of(res);
            } else {
                return Observable.throw(err);
            }
        });
    }
}
