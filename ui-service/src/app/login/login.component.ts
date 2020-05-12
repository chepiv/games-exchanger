import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Token} from './token';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};
  token: Token = {} as Token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit() {

  }

  sendLoginRequest() {
    const url = environment.host + ':8762/oauth/token';

    const headers = {
      Authorization: 'Basic ' + btoa('eagleeye' + ':' + 'thisissecret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const body = new HttpParams() // fix cors policy
      .set('username', this.model.login)
      .set('password', this.model.password)
      .set('grant_type', 'webclient')
      .set('grant_type', 'password');

    this.http.post(environment.host + ':8762/' + 'oauth/token', body, {headers})
      .subscribe((data: Token) => this.token = data,
        err => alert('Invalid Credentials'),
        () => {
          console.log(this.token);
          sessionStorage.setItem('token', this.token.access_token);
          sessionStorage.setItem('authorized', 'true');
          sessionStorage.setItem('currentUser', this.model.login);
          this.router.navigate(['/user-details']);
        });
  }
}
