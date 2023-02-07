import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private userSvc: UserService,
    private router: Router,
    ) {}

  ngOnInit() {}

  logout(){
    this.router.navigateByUrl('login');
    this.userSvc.logout();
  }
}
