import {Component, OnInit} from '@angular/core';
import {Offer} from '../model/offer';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
  token: string;
  offers: Offer[];
  term: string;

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
      this.getAllOffers();
      this.offers.forEach(value => value.games.map(value1 => value1.name));
      console.log(this.offers.forEach(offer => offer.games));
    }

  }

  getAllOffers() {
    const url = 'http://localhost:8762/offers';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Offer[]>(url, {headers: reqHeader})
      .subscribe((data) => {
          console.log(data);
          this.offers = data;
        },
        error => console.log(error),
        () => console.log('Success'));
  }
}
