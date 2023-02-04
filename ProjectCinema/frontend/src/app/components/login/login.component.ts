import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service/user.service";

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
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  submit(){
    if(this.loginForm.invalid) {
      return
    }
    this.userService.login({email:this.loginForm.value.email,
      password: this.loginForm.value.password}).subscribe(() => {
      const success = this.router.navigateByUrl(this.returnUrl);
      console.log(success)
    });
  }
  onBlur(event: any) {
    if (! event.target.value) {
      this.focused = false;
  }

  }


}
