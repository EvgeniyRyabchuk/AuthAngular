import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpService} from "./http.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private httpService: HttpService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEvent<any>>> {
    if(this.httpService.subjectLg)
    {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return next.handle(request);
    }
    console.log('no token');
    return next.handle(request);
  }
}
