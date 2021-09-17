import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{


  loggedIn:boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.subjectLg.subscribe((res: boolean) =>
    {
        this.loggedIn = res;
    });

    this.loggedIn = localStorage.getItem('token') !== null;
    console.log('login: ' + this.loggedIn);
  }

  logout():void
  {
    localStorage.removeItem('token');
    this.httpService.subjectLg.next(localStorage.getItem('token') !== null);
    console.log('login: ' + this.loggedIn);
  }

  click():void
  {
    this.httpService.show().subscribe(res => console.log(res));
  }

  refresh_token(): void
  {
    if(this.httpService.subjectLg) {
      const refresh_token = localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : undefined;
      if(refresh_token) {
        const data = {
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
          client_id: this.httpService.subjectUser.getValue().id,
          client_secret: 'ZwSqB3EZwS5C1kKF5wjiL0K4mhIGoaHry1O6xXbp',
          scope: '*'
        };
        this.httpService.refresh_token(data).subscribe(
          res => console.log(res)
        )
      }
      //this.httpService.show().subscribe(res => console.log(res));
    }
  }



}
