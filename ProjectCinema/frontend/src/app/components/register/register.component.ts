import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordsMatchValidator} from "../../shared/validators/password_match_validator";
import {IUserRegister} from "../../shared/models/IUserRegister";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm:FormGroup = new FormGroup({});
  public focused:boolean = false;
  public returnUrl: string = "";

  private isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
      isEventer: new FormControl(false),
    }, PasswordsMatchValidator('password', 'confirmPassword'));

    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    const fc= this.registerForm.value;
    const user :IUserRegister = {
      name: fc.name,
      password: fc.password,
      confirmPassword: fc.confirmPassword,
      isEventer: fc.isEventer,

    };
    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl).then(() =>{
        console.log("navigation succesfully to ", this.returnUrl)
      });
    })
  }

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }
}
