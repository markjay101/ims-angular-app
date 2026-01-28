import { UserService } from './../services/user/user-service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) return true;

  console.warn('Unauthorized.');

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
