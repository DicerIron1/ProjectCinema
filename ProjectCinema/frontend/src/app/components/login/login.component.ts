import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service/user.service";
import {User} from "../../shared/models/User";

const USER_KEY = 'User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm :FormGroup = new FormGroup({});
  public isSubmitted : boolean = false;
  public focused : boolean = false;

  private returnUrl: string ="";

  constructor(private formBuilder: FormBuilder,
              private userService:UserService ,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name:['', [Validators.required]],
      password:['', Validators.required]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  submit(){
    if(this.loginForm.invalid) {
      console.log("loginForm.invalid")
      return;
    }
    this.userService.login(
      {name:this.loginForm.value.name,
        password: this.loginForm.value.password}).subscribe(
          response=> {
            const currentUser = {
              id : response.id,
              name: response.name,
              token: response.token,
              isEventer:response.isEventer,
              city_id:response.city_id }
            this.setUserToLocalStorage(currentUser);
            this.router.navigateByUrl(this.returnUrl);
    });
  }
  onBlur(event: any) {
    if (! event.target.value) {
      this.focused = false;
    }
  }
  private setUserToLocalStorage(user :User){
    localStorage.setItem( USER_KEY, JSON.stringify(user));
  }


}
