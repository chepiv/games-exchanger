import { Component, OnInit } from '@angular/core';
import {Account} from '../model/account';
import {Token} from '../login/token';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  account: Account = {} as Account;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('http://localhost:8762/' + 'accounts/register', this.account)
      .subscribe((data: any) => console.log(data),
        err => alert('Unable to register'),
        () => {
          this.router.navigate(['/login']);
        });
  }
}
