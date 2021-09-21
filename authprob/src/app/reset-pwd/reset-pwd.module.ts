import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPwdComponent} from "./reset-pwd.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: ResetPwdComponent,
  }
];

@NgModule({
  declarations: [ResetPwdComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ]
})

export class ResetPwdModule { }
