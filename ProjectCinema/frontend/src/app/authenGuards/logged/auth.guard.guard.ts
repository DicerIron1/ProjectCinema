import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {User} from "../../shared/models/User";
import {UserService} from "../../services/user.service/user.service";

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) {
      this.router.navigate(['/login']);
      return of(false);
    }
    const user = JSON.parse(userJson) as User;
    if (!user.token) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.userService.checkTokenValidity(user.token).pipe(
      map(response => {
        if (response) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

}
