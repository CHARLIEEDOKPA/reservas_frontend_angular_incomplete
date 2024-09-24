import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(JwtService);
  const token = localStorageService.getToken();
  if (!token) {
    return next(req);
  }
  const reqClone = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
  return next(reqClone);
};
