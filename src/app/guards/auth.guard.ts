import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isAuthenticated.subscribe(
      (res) => {
        if (res === false) {
          localStorage.setItem('redirectTo', this.router.url);
          this.router.navigateByUrl('/apps/auth/login', { replaceUrl: true });
          return false;
        } else {
          return true;
        }
      }
    );
    return true;
  }

}
