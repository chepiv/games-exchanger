import { Component, OnInit } from '@angular/core';
import {ExchangeOffer} from '../model/exchangeOffer';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sent-offers',
  templateUrl: './sent-offers.component.html',
  styleUrls: ['./sent-offers.component.css']
})
export class SentOffersComponent implements OnInit {



  sentOffers: ExchangeOffer[];
  token: string;

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
      this.getAllSentffers();
    }

  }

  getAllSentffers() {
    const url = environment.host + ':8762/offers/sentOffers';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<ExchangeOffer[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.sentOffers = data;
      });
  }

  navigateToOffer(id: number) {
    this.router.navigate(['/received-offer/' + id]);
  }


}
