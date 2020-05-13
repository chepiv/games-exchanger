import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExchangeOffer} from '../model/exchangeOffer';
import {Account} from '../model/account';
import {environment} from '../../environments/environment';
import {Message} from '../model/message';
import {interval} from 'rxjs';


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
  userFromSourceOffer: Account;
  historyMessages: Message[];
  messageToSend: Message = {} as Message;
  textToSend: string;
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
      this.getMessageHistory();
      interval(5000)
        .subscribe((val) => {
          this.getMessageHistory();
        });

    }

  }


  getOfferById() {
    const url = environment.host + ':8762/offers/exchangeOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<ExchangeOffer>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.offer = data;
      }, error => (console.log(error)),
        () => {
          this.getUserByLogin(this.offer.accountId);
          this.getUserFromSourceOffer(this.offer.sourceOffer.accountId);
        });
  }

  getUserByLogin(login: number) {
    const url = environment.host + ':8762/accounts/byId/' + login;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Account>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.userWhoOffer = data;
      });
  }

  getUserFromSourceOffer(login: number) {
    const url = environment.host + ':8762/accounts/byId/' + login;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Account>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.userFromSourceOffer = data;
      });
  }

  acceptOffer() {
    const url = environment.host + ':8762/offers/acceptOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.post(url, null, {headers: reqHeader})
      .subscribe(data => {

      },
        error => this.toastr.error('Unable to accept offer', 'Error'),
        () => {
        this.toastr.success('Offer accepted', 'Success');
        this.router.navigate(['/user-details']);
        });
  }

  declineOffer() {
    const url = environment.host + ':8762/offers/declineOffer/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.post(url, null, {headers: reqHeader})
      .subscribe(data => {

        },
        error => this.toastr.error('Unable to decline offer', 'Error'),
        () => {
          this.toastr.success('Offer declined', 'Success');
          this.router.navigate(['/user-details']);
        });
  }

  sendMessage(text: string) {
    const url = environment.host + ':8762/message';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.messageToSend.exchangeOfferId = Number(this.id);
    this.messageToSend.messageText = text;

    this.http.post(url, this.messageToSend, {headers: reqHeader})
      .subscribe(data => {
          this.getMessageHistory();
        },
        error => this.toastr.error('Unable to send message', 'Error'),
        () => {
          this.toastr.success('Message sent', 'Success');
        });
  }

  getMessageHistory() {
    const url = environment.host + ':8762/message/history/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Message[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        this.historyMessages = data;
      });
  }

  handleOnChange($event: Event) {
    // @ts-ignore
    this.textToSend = $event.data;
  }
}
