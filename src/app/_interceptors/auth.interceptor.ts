import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)

  if (userService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.currentUser()?.token}`
      }
    })
  }

  return next(req);
};
