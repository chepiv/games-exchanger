import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {RegistrationComponent} from './registration/registration.component';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesLibraryComponent} from './games-library/games-library.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {AddOfferComponent} from './add-offer/add-offer.component';
import {AllOffersComponent} from './all-offers/all-offers.component';
import {OfferDetailsComponent} from './offer-details/offer-details.component';
import {ExchangeOfferComponent} from './exchange-offer/exchange-offer.component';
import {ReceivedOfferComponent} from './received-offer/received-offer.component';
import {ReceivedOffersComponent} from './received-offers/received-offers.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user-details', component: UserDetailsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'library', component: GamesLibraryComponent},
  {path: 'games', component: AllGamesComponent},
  {path: 'add-offer', component: AddOfferComponent},
  {path: 'offers', component: AllOffersComponent},
  {path: 'offer-details/:id', component: OfferDetailsComponent},
  {path: 'exchange-offer/:id', component: ExchangeOfferComponent},
  {path: 'received-offer/:id', component: ReceivedOfferComponent},
  {path: 'received-offers', component: ReceivedOffersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
