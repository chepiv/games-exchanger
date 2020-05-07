import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExchangeOffer} from '../model/exchangeOffer';

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
  offerImageUrl = '../../assets/default-game.png';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOfferById();
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
      });
  }

}
