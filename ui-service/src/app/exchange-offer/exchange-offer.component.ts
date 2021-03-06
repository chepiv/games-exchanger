import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Game} from '../model/game';
import {Offer} from '../model/offer';
import {ExchangeOffer} from '../model/exchangeOffer';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-exchange-offer',
  templateUrl: './exchange-offer.component.html',
  styleUrls: ['./exchange-offer.component.css']
})
export class ExchangeOfferComponent implements OnInit {

  token: string;
  userGames: Game[];
  exchangeOffer: ExchangeOffer = {} as ExchangeOffer;
  offer: Offer;
  id: string;

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
      this.getAllUsersGames();
      this.getOfferById();
    }

  }

  getAllUsersGames() {
    const url = environment.host + ':8762/library/libraryForExchange';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.userGames = data;
      });
  }

  sendExchangeOffer() {
    const url = environment.host + ':8762/offers/exchangeOffer';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.exchangeOffer.sourceOffer = this.offer;
    this.exchangeOffer.offeredGames = this.userGames.filter(game => game.checked === true);

    this.http.post<ExchangeOffer>(url, this.exchangeOffer, {headers: reqHeader})
      .subscribe((data: any) => console.log(data),
        error => this.toastr.error('Unable to create exchange offer', 'Error'),
        () => {
          this.toastr.success('Success', 'Success');
          this.router.navigate(['/user-details']);
        }
        );
  }


  getOfferById() {
    const url = environment.host + ':8762/offers/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Offer>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.offer = data;
      });
  }

}
