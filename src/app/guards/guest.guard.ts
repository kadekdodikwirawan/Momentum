import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isAuthenticated.subscribe(
      (res) => {
        if (res !== true) {
          return true;
        } else {
          const redirect = localStorage.getItem('redirectTo');
          if (redirect) {
            this.router.navigateByUrl(redirect, { replaceUrl: true });
          } else {
            this.router.navigateByUrl('', { replaceUrl: true });
          }
          return false;
        }
      }
    );
    return true;
  }

}
