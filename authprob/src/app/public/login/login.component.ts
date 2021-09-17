import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpService} from "../../../shared/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  submit():void
  {
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'ZwSqB3EZwS5C1kKF5wjiL0K4mhIGoaHry1O6xXbp',
      scope: '*'
    };

    this.httpService.getToken(data).subscribe(
      (result: any) => {
        console.log('success');
        console.log(result);
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        this.httpService.subjectLg.next(true);
        this.router.navigate(['/secure'])
      },
      error => {
        console.log('error');
        console.log(error);
      });

  }


}
