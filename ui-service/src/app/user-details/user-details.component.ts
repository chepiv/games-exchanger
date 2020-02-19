import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/account';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  account: Account = {} as Account;
  token: string;
  profileImage: any;
  url = 'http://localhost:8762/downloadFile/' + this.account.imageUrl;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    if (this.token == null) {
      this.router.navigate(['']);
    } else {
      this.getUserByLogin();

    }
  }

  getUserByLogin() {
    const url = 'http://localhost:8762/accounts/user-details';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Account>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.account = data;
        if (this.account.imageUrl != null && this.account.imageUrl !== 'undefined') {
          this.getImage();
        }
      });
  }

  getImage() {
    const url = 'http://localhost:8762/downloadFile/' + this.account.imageUrl;
    this.http.get(url, {responseType: 'blob'})
      .subscribe(data => {
          this.createImageFromBlob(data);
          this.profileImage = data;
          console.log(data);
        }, ((data: any) => console.log(data)),
      );

  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.profileImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


}
