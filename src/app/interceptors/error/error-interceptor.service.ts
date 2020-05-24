import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    const token: string = localStorage.getItem('token');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Barrer' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    // if (!request.headers.has('timeout')) {
    //   request = request.clone({ headers: request.headers.set('timeout', this.defaultTimeout.toString()) });
    // }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    const timeoutValue = request.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);


    return next.handle(request).pipe(timeout(timeoutValueNumeric)).pipe(retry(5));
  }
}
