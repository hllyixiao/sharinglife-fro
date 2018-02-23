import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/RX';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
        return next.handle(req).map(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 400) {
                    // TODO  go to login or error page
                }
            }
            return event;
        });
    }
}
