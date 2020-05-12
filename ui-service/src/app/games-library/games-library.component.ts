import {Component, OnInit} from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.css']
})
export class GamesLibraryComponent implements OnInit {

  token: string;
  public id: string;
  games: Game[];
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
    const url = environment.host + ':8762/library';
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token
    });

    this.http.get<Game[]>(url, {headers: reqHeader})
      .subscribe((data) => {
        console.log(data);
        this.games = data;
      });
  }

  removeGameFromLibrary(gameId: number) {
    const url = environment.host + ':8762/library/' + gameId;
    const reqHeader = new HttpHeaders({
      Authorization: 'Bearer' + this.token,
      'Content-type': 'application/json'
    });

    this.http.delete(url, {headers: reqHeader})
      .subscribe(data => console.log(data),
        error => {
          console.log(error);
          this.toastr.error('Unable to delete game', 'Error');
        },
        () => {
          console.log('success');
          this.toastr.success('Game was deleted successfully', 'Success');
          window.location.reload();
        });
  }



}
