import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { apiSettings } from '../../../core/models/youtube-api.model';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<null>, next: HttpHandler)
        : Observable<HttpEvent<HttpRequest<null>>> {
        const keyRequest: HttpRequest<null> = request.clone({
            setParams: {
                'key': apiSettings.apiKey
            }
        });

        return next.handle(keyRequest);
    }

}
