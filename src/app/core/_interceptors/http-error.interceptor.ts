import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/browser';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (environment.production) {
            Sentry.captureMessage(`[Handled] HttpErrorResponse with code ${response.status}`);
          }
          window.location.href = 'coming-soon.html';
          return EMPTY;
        } else {
          return throwError(response);
        }
      })
    );
  }
}
