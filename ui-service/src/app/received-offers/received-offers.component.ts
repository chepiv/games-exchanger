import {Component, OnInit} from '@angular/core';
import {ExchangeOffer} from '../model/exchangeOffer';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-received-offers',
  templateUrl: './received-offers.component.html',
  styleUrls: ['./received-offers.component.css']
})
export class ReceivedOffersComponent implements OnInit {

  receivedOffers: ExchangeOffer[];
  token: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.getAllReceivedOffers();
  }

  getAllReceivedOffers() {
    const url = 'http://localhost:8762/offers/receivedOffers';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<ExchangeOffer[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.receivedOffers = data;
      });
  }

  navigateToOffer(id: number) {
    this.router.navigate(['/received-offer/' + id]);
  }

}
