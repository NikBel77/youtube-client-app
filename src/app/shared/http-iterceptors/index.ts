import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor/token-interceptor';

/* tslint:disable: typedef */
export const httpInterceptProviders = [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ];
/* tslint:enable: typedef */
