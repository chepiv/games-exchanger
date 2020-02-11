import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user-details', component: UserDetailsComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
