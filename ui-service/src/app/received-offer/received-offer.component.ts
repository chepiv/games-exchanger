import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExchangeOffer} from '../model/exchangeOffer';
import {Account} from '../model/account';

@Component({
  selector: 'app-received-offer',
  templateUrl: './received-offer.component.html',
  styleUrls: ['./received-offer.component.css']
})
export class ReceivedOfferComponent implements OnInit {

  token: string;
  public id: string;
  currentUser: string;
  offer: ExchangeOffer;
  userWhoOffer: Account;
  offerImageUrl = '../../assets/default-game.png';

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
      this.id = this.route.snapshot.paramMap.get('id');
      this.getOfferById();
    }

  }


  getOfferById() {
    const url = 'http://localhost:8762/offers/exchangeOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<ExchangeOffer>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.offer = data;
      }, error => (console.log(error)),
        () => this.getUserByLogin(this.offer.accountId));
  }

  getUserByLogin(login: number) {
    const url = 'http://localhost:8762/accounts/byLogin/' + login;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Account>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.userWhoOffer = data;
      });
  }

  acceptOffer() {
    const url = 'http://localhost:8762/offers/acceptOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.post(url, null, {headers: reqHeader})
      .subscribe(data => {

      });
  }

  declineOffer() {
    const url = 'http://localhost:8762/offers/declineOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.post(url, null, {headers: reqHeader})
      .subscribe(data => {

      });
  }

}
