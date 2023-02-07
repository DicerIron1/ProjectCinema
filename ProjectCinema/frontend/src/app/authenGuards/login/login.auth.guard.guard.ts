import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../shared/models/User";

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson && (JSON.parse(userJson) as User).token) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

}
