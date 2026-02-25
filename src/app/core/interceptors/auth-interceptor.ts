import { AuthService } from '@services/auth-service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { STORAGE_KEYS } from '@constants/storage';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('auth/sign-in') &&
        !req.url.includes('auth/refresh-token')
      ) {
        return authService.refreshToken().pipe(
          switchMap((res) => {
            if (res.succeeded && res.data) {
              return next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${res.data}` },
                }),
              );
            }
            return handleAuthError(router, error);
          }),
          catchError((refreshErr) => handleAuthError(router, refreshErr)),
        );
      }

      if (error.status === 401 && req.url.includes('auth/refresh-token')) {
        return handleAuthError(router, error);
      }

      return throwError(() => error);
    }),
  );
};

function handleAuthError(router: Router, error: any) {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);

  if (!router.url.includes('/login')) {
    router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
  }
  return throwError(() => error);
}
