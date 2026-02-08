import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router); // Create Object using dependency injection without using constructor
  let token  = localStorage.getItem('token');

  if (token)
    return true;

  router.navigate(['/login'], { queryParams: { authRequired: 'true' } }); // Redirect to login page with query parameter to show error message
  return false;
};
