import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDetailsComponent} from './user-details/user-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './registration/registration.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {GameDetailsComponent} from './game-details/game-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {GamesLibraryComponent} from './games-library/games-library.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {AddOfferComponent} from './add-offer/add-offer.component';
import {AllOffersComponent} from './all-offers/all-offers.component';
import {NamePipe} from './all-offers/namePipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import { ExchangeOfferComponent } from './exchange-offer/exchange-offer.component';
import { ReceivedOfferComponent } from './received-offer/received-offer.component';
import { ReceivedOffersComponent } from './received-offers/received-offers.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SentOffersComponent } from './sent-offers/sent-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailsComponent,
    RegistrationComponent,
    GameDetailsComponent,
    GamesLibraryComponent,
    AllGamesComponent,
    AddOfferComponent,
    AllOffersComponent,
    NamePipe,
    OfferDetailsComponent,
    ExchangeOfferComponent,
    ReceivedOfferComponent,
    ReceivedOffersComponent,
    SentOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2SearchPipeModule,
    Angular2ImageGalleryModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
