import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecureComponent} from "./secure.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
  }
];

@NgModule({
  declarations: [SecureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecureModule { }
