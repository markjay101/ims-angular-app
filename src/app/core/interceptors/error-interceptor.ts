import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiResponse = error.error as ApiResponse<any>;

      let errorMessage = 'An unexpected error occurred';

      if (apiResponse?.errors?.length > 0) {
        errorMessage = apiResponse.errors[0];
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Try again later.';
      }

      return throwError(() => new Error(errorMessage));
    }),
  );
};
