import { Component, OnInit } from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {


  token: string;
  public id: string;
  games: Game[];
  term: string;
  gameImage: any = '/assets/default-game.png';

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

      this.getAllUsersGames();
    }
  }


  getAllUsersGames() {
    const url = 'http://localhost:8762/games';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.games = data;
      });
  }

  addGameToLibrary(gameId: number) {
    const url = 'http://localhost:8762/library/' + gameId;
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
