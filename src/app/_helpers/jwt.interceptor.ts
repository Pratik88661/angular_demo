import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const user = localStorage.getItem('currentUser');
        let currentUser = user? JSON.parse(user):'';
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    'x-auth-token': `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}