import {Component, OnInit} from '@angular/core';
import {Game} from '../model/game';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  token: string;
  public id: string;
  game: Game = {} as Game;

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
      this.getGameById();
    }

  }


  getGameById() {
    const url = 'http://localhost:8762/games/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.game = data;
      });
  }

  addGameToLibrary() {
    const url = 'http://localhost:8762/library/' + this.id;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token,
      'Content-type': 'application/json'
    });

    this.http.post(url, null, {headers: reqHeader})
      .subscribe(data => console.log(data),
        error => {
          console.log(error);
          this.toastr.error('Unable to add game', 'Error');
        },
        () => {
          console.log('success');
          this.toastr.success('Game was added successfully', 'Success');
        });
  }


}
