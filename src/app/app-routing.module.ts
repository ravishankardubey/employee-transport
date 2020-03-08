import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'add-ride', component: AddRideComponent },
  { path: 'book-ride', component: BookRideComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
