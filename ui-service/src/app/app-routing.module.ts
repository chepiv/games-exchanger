import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {RegistrationComponent} from './registration/registration.component';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesLibraryComponent} from './games-library/games-library.component';
import {AllGamesComponent} from './all-games/all-games.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user-details', component: UserDetailsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'library', component: GamesLibraryComponent},
  {path: 'games', component: AllGamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
