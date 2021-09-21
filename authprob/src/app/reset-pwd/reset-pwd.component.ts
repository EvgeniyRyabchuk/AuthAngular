import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../shared/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  token: string;
  formGroupe: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute) {
    console.log('Called Constructor');
    // this.route.queryParams.subscribe(params => {
    //    this.token = params['token'];
    // });
    this.route.paramMap.subscribe(params => {
       this.token = params.get('token') || '';
    });
  }

  ngOnInit(): void {
    this.formGroupe = this.fb.group(
      {
        token: [this.token, Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
      }
    )
    console.log(this.token);
  }

  submit()
  {
    const formData = this.formGroupe.getRawValue();
    console.dir(formData);
    this.httpService.password_reset(formData).subscribe(
      res => console.log(res)
    );

  }
}
