import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// HttpClient -> Interceptor  ->  API
// HttpClient <- Interceptor  <-  API

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Клонирование запроса => пустой запрос
    //const request = req.clone();
    //return next.handle(request);

    const request = req.clone({ params: req.params.set('x', '5') });
    return next.handle(request).pipe(catchError(error => {
        if (error.status === 401) {
          console.log('redirect to login');
        }
        return throwError(error);
      })
    );
  }
}
