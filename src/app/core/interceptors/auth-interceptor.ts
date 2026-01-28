import { HttpInterceptorFn } from '@angular/common/http';
import { STORAGE_KEYS } from '../constants/storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  const authReq = token
    ? req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(req);
};
