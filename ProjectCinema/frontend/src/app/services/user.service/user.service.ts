import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap} from 'rxjs/operators'
import {
  USER_LOGIN_URL
} from '../../shared/constants/urls';
import { IUserLogin } from '../../shared/models/IUserLogin';
import { User } from '../../shared/models/User';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
    new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public isAdmin = false;
  public userObservable:Observable<User>;

  constructor(private http:HttpClient,
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          const currentUser = {id : user.id, name: user.name, email: user.email, token: user.token }
          this.setUserToLocalStorage(currentUser);
          this.isAdmin = user.isAdmin;
          this.userSubject.next(user);
        },
        error: (errorResponse:Error) => {
          console.log(errorResponse.message, 'Login Failed')
        }
      })
    );
  }
  /*logout(){
    this.userSubject.next(new User());
    this.isAdmin =false;
    localStorage.removeItem(USER_KEY);
  }*/

  private setUserToLocalStorage(user: { name:string, email:string, token:string}){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User
    }
    return new User();
  }

 /* private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
    }
    return throwError(() => new Error(error.message || 'Node.js server error'));
  }*/
}