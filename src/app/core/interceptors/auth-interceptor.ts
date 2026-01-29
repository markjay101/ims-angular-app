import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { STORAGE_KEYS } from '../constants/storage';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('AUTH_TOKEN');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
