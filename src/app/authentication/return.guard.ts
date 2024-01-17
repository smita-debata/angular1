import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const returnGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = loginService.loggedIn();
  if (!isLoggedIn) {
    return true;
  } else {
    return false;
  }
};
