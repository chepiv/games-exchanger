import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Offer} from '../model/offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  token: string;
  public id: string;
  currentUser: string;
  offer: Offer;
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
      this.currentUser = sessionStorage.getItem('currentUser');
      this.getOfferById();
    }

  }

  private getImageForOffer(offer: Offer) {
    const gamesCovers = offer.games.map(game => game.coverUrl);
    const find = gamesCovers.find(value => this.isNotNull(value));
    if (find != null) {
      this.offerImageUrl = find;
    }
  }

  isNotNull(item: string) {
    return item != null;
  }

  navigateToExchangeOffer(offerId: number) {
    this.router.navigate(['/exchange-offer/' + offerId]);
  }

  deleteOffer() {
    const url = 'http://localhost:8762/offers/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.delete(url, {headers: reqHeader})
      .subscribe(data => console.log(data),
        error => this.toastr.error('Unable to delete offer', 'Error'),
        () => {
        this.toastr.success('Deleted offer', 'Success');
        this.router.navigate(['/offers']);
        });
  }


  getOfferById() {
    const url = 'http://localhost:8762/offers/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Offer>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.offer = data;
        this.getImageForOffer(data);
      });
  }

}
