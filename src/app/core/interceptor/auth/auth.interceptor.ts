import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor() {}

  private get token(): string {
    return localStorage.getItem('AUTH_TOKEN')! || '';
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    console.warn(`Uf! Something wrong...\n${error.message}`);
    return throwError(error.message);
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    const requestClone: HttpRequest<any> = request.clone({
      headers
    });

    return next.handle(requestClone)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
