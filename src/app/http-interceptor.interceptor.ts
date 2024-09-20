import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';



export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService)
  const token = localStorageService.getToken()
  if (!token) {
    return next(req);
  }
  const reqClone = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`
    }
  })
  return next(reqClone)
  
};
