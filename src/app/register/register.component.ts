import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }
  submit(): void{
    console.log(this.form.getRawValue());
    this.http.post(`${this.apiServerUrl}/api/auth/signup`, this.form.getRawValue())
    .subscribe(() => this.router.navigate(['/login'])
    );
  }

}
