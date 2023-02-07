import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service/user.service";
import {User} from "../../shared/models/User";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss'],
})
export class UsersManagerComponent implements OnInit {

  public users: User[] | null;
  constructor(
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      response =>{
        // @ts-ignore
        this.users = response;
      }
    )
  }
  viewUser(user:User){
    console.log(user)
  }
  loadData(event:any){
    console.log(event);
  }

}
