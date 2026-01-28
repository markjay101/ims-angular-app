import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(req);
};
