import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { apiSettings } from '../../../core/models/youtube-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<null>, next: HttpHandler) {
        const keyRequest: HttpRequest<null> = request.clone({
            setParams: {
                'key': apiSettings.apiKey
            }
        });

        return next.handle(keyRequest);
    }

}
