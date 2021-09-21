import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {SecureComponent} from "./secure/secure.component";
import {HomeComponent} from "./public/home/home.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./public/register/register.module').then(m => m.RegisterModule) }
    ]
  },

  {
    path: 'secure', loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
  },
  // path: 'reset/:token'
  { path: 'reset/:token', loadChildren: ()=> import('./reset-pwd/reset-pwd.module').then(m => m.ResetPwdModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
