import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Account} from './account';
import {Observable} from 'rxjs';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  account: Account = {} as Account;
  loginRequestParam: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    this.loginRequestParam = sessionStorage.getItem('currentLogin');
  }

  ngOnInit() {
    if (this.loginRequestParam == null) {
      this.router.navigate(['']);
    } else {
      this.getUserByLogin();
    }
  }

  getUserByLogin() {
    const url = 'http://localhost:8762/accounts/' + this.loginRequestParam;
    this.http.get<Account>(url)
      .subscribe((data: Account) => {
        console.log(data);
        this.account = data;
      });
  }

}
