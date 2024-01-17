import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = loginService.loggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/'])
    return false;
  }
};



