import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  sendLoginRequest() {
    const url = 'http://localhost:8762/accounts/login';
    this.http.post<Observable<boolean>>(url, {
      login: this.model.login,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.model.login + ':' + this.model.password));
        localStorage.setItem('currentLogin', this.model.login);
        this.router.navigate(['/user-details']);
      } else {
        alert('Authentication failed.');
      }
    });
  }
}
