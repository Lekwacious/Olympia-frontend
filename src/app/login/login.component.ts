import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
      });
  }
  submit(): void{
    console.log(this.form.getRawValue());
    this.http.post(`${this.apiServerUrl}/api/auth/signin`, this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['mainview']));
  }

}
