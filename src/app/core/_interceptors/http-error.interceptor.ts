import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((response: HttpErrorResponse) => {
        if (response.error instanceof ErrorEvent) {
          // client-side error
          return throwError(response.error.message);
        } else {
          // server-side error
          this.router.navigateByUrl('/coming-soon');
          return EMPTY;
        }
      })
    );
  }
}
