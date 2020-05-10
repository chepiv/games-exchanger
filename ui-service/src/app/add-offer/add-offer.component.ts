import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../model/game';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Offer} from '../model/offer';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  token: string;
  public id: string;
  games: Game[];
  offer: Offer = {} as Offer;
  gameImage: any = '/assets/default-game.png';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService) {
    this.token = sessionStorage.getItem('token');
  }

  dropdownList;
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    if (this.token == null) {
      this.router.navigate(['']);
    } else {
      this.getAllUsersGames();
      // this.dropdownList = this.games;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        enableCheckAll: false,
        allowSearchFilter: true
      };
    }

  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
  }

  onItemDeSelect(item: any) {
    console.log(item);
    this.selectedItems = this.selectedItems.filter(value => value.name !== item.name);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {
    // this.offer.games = this.games.map(value => value.id);
    const selectedItemsNames = this.selectedItems.map(value => value.name);
    this.offer.games = this.games.filter(game => selectedItemsNames.includes(game.name));
    const url = 'http://localhost:8762/offers';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.post<Offer>(url, this.offer, {headers: reqHeader})
      .subscribe((data: any) => console.log(data),
        error => this.toastr.error('Unable to create offer, maybe its already in order', 'Error'),
        () => this.toastr.success('Success', 'Success'));
  }

  getAllUsersGames() {
    const url =  'http://localhost:8762/library/libraryForExchange';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game[]>(url, {headers: reqHeader})
      .subscribe((data) => {
          console.log(data);
          this.games = data;
        },
        error => console.log(error),
        () => console.log('aaaa'));
  }

}
