import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {
  USER_LOGIN_URL, USER_REGISTER_URL, USER_URL
} from '../../shared/constants/urls';
import { IUserLogin } from '../../shared/models/IUserLogin';
import { User } from '../../shared/models/User';
import {IUserRegister} from "../../shared/models/IUserRegister";

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAdmin = false;

  constructor(private http:HttpClient,
  ) {
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin);
  }
  getIsCurrentUserAdmin(id:string): Observable<boolean> {
    return this.http.get<boolean>(USER_URL +"/" + id + "/isAdmin")
  }
  logout(){
    localStorage.removeItem(USER_KEY);
  }
  checkTokenValidity(token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<boolean>(USER_URL + "/verifyAccess",httpOptions)
  }

  /*private setUserToLocalStorage(user: { name:string, email:string, token:string}){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }*/

  /*private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User
    }
    return new User();
  }*/

 /* private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
    }
    return throwError(() => new Error(error.message || 'Node.js server error'));
  }*/
  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser);
  }
}
