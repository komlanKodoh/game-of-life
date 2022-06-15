import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.userService.getToken();

    if (token)
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

    return next.handle(req);
  }
}
