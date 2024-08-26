import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggenIn();
  }

  public isUserLoggenIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      Swal.fire({
        icon: 'error',
        title: 'You need to log in to access this page',
        showConfirmButton: true,
        // timer: 1500,
      });

      return false;
    }
  }
}
