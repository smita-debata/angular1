import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    const userRole = this.authService.getUserRole();
    if (accessToken && userRole) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    if (userRole === 'ROLE_TENANT' && request.url.includes('/tenant')) {
      return next.handle(request);
    } else if (userRole === 'ROLE_LANDLORD' && request.url.includes('/landlord')) {
      return next.handle(request);
    }
    else {
      return next.handle(request);
    }

  }
}
