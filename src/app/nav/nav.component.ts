import { Component, OnInit } from '@angular/core';
import {Emmitters} from '../emmitters/emmitters';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  authenticated = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emmitters.authEmmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }
  logout(): void {
    this.http.post(`${this.apiServerUrl}/api/logout`, {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }

}
