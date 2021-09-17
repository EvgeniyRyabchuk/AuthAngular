import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SecureComponent } from './secure/secure.component';
import {PublicModule} from "./public/public.module";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../shared/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
