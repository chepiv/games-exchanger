import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};
  token: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  sendLoginRequest() {
    const url = 'http://localhost:8762/oauth/token';

    const headers = {
      Authorization: 'Basic ' + btoa('eagleeye' + ':' + 'thisissecret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const body = new HttpParams() // fix cors policy
      .set('username', this.model.login)
      .set('password', this.model.password)
      .set('grant_type', 'webclient')
      .set('grant_type', 'password');

    this.http.post('http://localhost:8762/' + 'oauth/token', body, {headers})
      .subscribe(data => this.token = data,
        err => alert('invalid Creadtilas'),
        () => console.log(this.token));


    // this.http.post<Observable<boolean>>(url, {
    //   login: this.model.login,
    //   password: this.model.password
    // }).subscribe(isValid => {
    //   if (isValid) {
    //     sessionStorage.setItem('token', btoa(this.model.login + ':' + this.model.password));
    //     sessionStorage.setItem('currentLogin', this.model.login);
    //     this.router.navigate(['/user-details']);
    //   } else {
    //     alert('Authentication failed.');
    //   }
    // });
  }
}
