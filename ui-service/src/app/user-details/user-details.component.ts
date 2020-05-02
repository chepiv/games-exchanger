import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/account';
import {Game} from '../model/game';
import {ToastrService} from 'ngx-toastr';
import {Offer} from '../model/offer';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  account: Account = {} as Account;
  token: string;
  profileImage: any;
  games: Game[];
  offers: Offer[];
  url = 'http://localhost:8762/downloadFile/' + this.account.imageUrl;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    if (this.token == null) {
      this.router.navigate(['']);
    } else {
      this.getUserByLogin();
      this.getAllUsersGames();
      this.getAllUsersOffers();
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
        } else {
          this.profileImage = '/assets/default-profile.png';
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
        }, ((data: any) => {
          console.log(data);
          this.profileImage = '/assets/default-profile.png';
        }),
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

  getAllUsersGames() {
    const url = 'http://localhost:8762/library';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.games = data;
      });
  }

  getAllUsersOffers() {
    const url = 'http://localhost:8762/offers/user-offers';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Offer[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.offers = data;
      });
  }

  removeGameFromLibrary(gameId: number) {
    const url = 'http://localhost:8762/library/' + gameId;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token,
      'Content-type': 'application/json'
    });

    this.http.delete(url, {headers: reqHeader})
      .subscribe(data => console.log(data),
        error => {
          console.log(error);
          this.toastr.error('Unable to delete game', 'Error');
        },
        () => {
          console.log('success');
          this.toastr.success('Game was deleted successfully', 'Success');
          window.location.reload();
        });
  }


}
