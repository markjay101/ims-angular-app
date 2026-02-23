import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
        return throwError(() => error);
      }

      const apiResponse = error.error as ApiResponse<any>;

      let errorMessage = apiResponse.message;

      if (
        apiResponse?.errors?.length > 0 &&
        errorMessage.toLocaleLowerCase().includes('validation')
      ) {
        errorMessage = apiResponse.errors[0];
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Try again later.';
      }

      toast.show(errorMessage, 'error');

      return throwError(() => new Error(errorMessage));
    }),
  );
};
