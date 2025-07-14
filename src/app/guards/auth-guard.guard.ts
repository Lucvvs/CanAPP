import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authGuardGuard: CanActivateFn & CanActivateChildFn = () => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  const isAuth = auth.isAuthenticated();
  console.log('🛡️ GUARD ejecutado. ¿Está autenticado?', isAuth);

  if (isAuth) {
    return true;
  } else {
    return router.createUrlTree(['']);
  }
};