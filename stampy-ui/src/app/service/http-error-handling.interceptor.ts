import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable()
export class HttpErrorHandling implements HttpInterceptor {
  constructor(private readonly errorService: ErrorService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(catchError((err) => {
      console.error(err);

      if(typeof(err.error) !== 'string') {
        this.errorService.addError(err.message);
      } else {
        this.errorService.addError(err.error);
      }
      return of(err);
    }));
  }
}