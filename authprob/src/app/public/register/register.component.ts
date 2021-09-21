import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../shared/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password_confirmation: ['', [Validators.required]]
      }
    )
  }
  submit():void
  {
    const formData = this.form.getRawValue();

    this.httpService.registerUser(formData).subscribe(
      result =>
      {
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

      },
        error => console.log(error)
    );
  }

}
