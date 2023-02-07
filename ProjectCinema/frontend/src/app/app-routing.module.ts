import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginAuthGuardGuard} from "./authenGuards/login/login.auth.guard.guard";
import {UserAuthGuardGuard} from "./authenGuards/user/user.auth.guard.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuardGuard} from "./authenGuards/logged/auth.guard.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAuthGuardGuard],
  },
  {
    path: 'anotherOne',
    component: RegisterComponent,
    canActivate: [UserAuthGuardGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
