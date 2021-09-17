import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../shared/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpService) { }

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

    console.dir(this.form.getRawValue());

    this.httpService.registerUser(formData).subscribe(
      result => console.log(result),
        error => console.log(error)
    );
  }

}
