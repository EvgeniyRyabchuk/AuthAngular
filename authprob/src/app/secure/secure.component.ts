import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpService} from "../../shared/http.service";
import {IUser} from "../../shared/interfaces";
import {User} from "../../shared/classes/user";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  user: any;
  constructor(private httpService: HttpService,
              private  router: Router)
  { }

  ngOnInit(): void {
    this.httpService.getUser().subscribe((res: IUser) =>
    {
      console.log(res);
      let newUser = new User(res);
      this.httpService.subjectUser.next(newUser);
      this.user = res;
    },
    (error) =>
    {
      localStorage.removeItem('token');
      this.httpService.subjectLg.next(false);
      this.router.navigate(['./login']);
    });
  }

}
