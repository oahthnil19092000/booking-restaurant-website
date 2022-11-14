import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authToken = localStorage.getItem('SessionID');
    if (authToken != null) {
      request = request.clone({
        setHeaders: {
          Authorization: authToken,
        },
      });
    }
    return next.handle(request);
  }
}
